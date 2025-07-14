@@ .. @@
         </script>
       </head>
       <body className={inter.className}>
         <ThemeProvider
           attribute="class"
           defaultTheme="system"
           enableSystem
           disableTransitionOnChange
         >
-          <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
+          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 lg:flex">
             <Sidebar />
-            <main className="flex-1 overflow-auto">
+            <main className="flex-1 lg:overflow-auto">
               {children}
             </main>
           </div>
           <Toaster />
         </ThemeProvider>
       </body>
     </html>
   );
 }