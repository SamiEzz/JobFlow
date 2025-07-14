@@ .. @@
   return (
-    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
+    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
       {stats.map((stat) => (
         <Card key={stat.title} className="hover:shadow-md transition-shadow">
-          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
+          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 lg:p-6">
             <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
             <stat.icon className={`h-4 w-4 ${stat.color}`} />
           </CardHeader>
-          <CardContent>
+          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
             <div className="text-2xl font-bold">{stat.value}</div>
-            <p className="text-xs text-muted-foreground">{stat.description}</p>
+            <p className="text-xs text-muted-foreground hidden sm:block">{stat.description}</p>
           </CardContent>
         </Card>
       ))}
     </div>
   );
 }