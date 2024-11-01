"use client";

export function CodePreview() {
  const code = `import React from 'react';
import { Code } from '@mantine/core';

function Demo() {
  return <Code>React.createElement()</Code>;
}`;

  return (
    <div className="rounded-lg border border-gray-800 bg-black p-6">
      <div className="mb-4 flex items-center space-x-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <pre className="font-mono text-sm text-gray-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}