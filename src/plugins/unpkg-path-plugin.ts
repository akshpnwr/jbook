import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

const fileCache = localforage.createInstance({ name: "fileCache" });

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);

        if (args.path === "index.js")
          return {
            path: args.path,
            namespace: "a",
          };

        if (args.path.includes("./") || args.path.includes("../")) {
          const newPath = new URL(
            args.path,
            `https://unpkg.com${args.resolveDir}/`
          ).href;

          return {
            path: newPath,
            namespace: "a",
          };
        }

        return { path: `https://unpkg.com/${args.path}`, namespace: "a" };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
            import React from 'react';
            console.log(react);
            `,
          };
        }
        const cachedResult = await fileCache.getItem(args.path);

        if (cachedResult) return cachedResult;

        const { data, request } = await axios.get(args.path);

        const result = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
