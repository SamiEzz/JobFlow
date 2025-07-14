@@ .. @@
   return (
   )
-    <div className="p-8 space-y-8">
+    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
       {/* Page Header */}
       <div>
         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Offers</h1>
         <p className="text-gray-600 dark:text-gray-400 mt-2">
           Browse and apply to job opportunities from your connected companies.
         </p>
       </div>

       {/* Stats Cards */}
-      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
+      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
         {stats.map((stat) => (
           <Card key={stat.title} className="hover:shadow-md transition-shadow">
-            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
+            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 lg:p-6">
               <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
               <stat.icon className={`h-4 w-4 ${stat.color}`} />
             </CardHeader>
-            <CardContent>
+            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
               <div className="text-2xl font-bold">{stat.value}</div>
             </CardContent>
           </Card>
         ))}
       </div>

       {/* Filters and Search */}
       <div className="space-y-4">
-        <div className="flex flex-col lg:flex-row gap-4">
+        <div className="flex flex-col sm:flex-row gap-4">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
             <Input
               placeholder="Search jobs, companies, or locations..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="pl-10"
             />
           </div>
-          <div className="flex gap-2">
+          <div className="flex flex-wrap gap-2">
             <Select value={filterLocation} onValueChange={setFilterLocation}>
-              <SelectTrigger className="w-[150px]">
+              <SelectTrigger className="w-full sm:w-[150px]">
                 <SelectValue placeholder="Location" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">All Locations</SelectItem>
                 <SelectItem value="San Francisco">San Francisco</SelectItem>
                 <SelectItem value="Seattle">Seattle</SelectItem>
                 <SelectItem value="New York">New York</SelectItem>
                 <SelectItem value="Austin">Austin</SelectItem>
               </SelectContent>
             </Select>
             <Select value={filterType} onValueChange={setFilterType}>
-              <SelectTrigger className="w-[130px]">
+              <SelectTrigger className="w-full sm:w-[130px]">
                 <SelectValue placeholder="Job Type" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">All Types</SelectItem>
                 <SelectItem value="Full-time">Full-time</SelectItem>
                 <SelectItem value="Part-time">Part-time</SelectItem>
                 <SelectItem value="Contract">Contract</SelectItem>
               </SelectContent>
             </Select>
             <Select value={filterRemote} onValueChange={setFilterRemote}>
-              <SelectTrigger className="w-[120px]">
+              <SelectTrigger className="w-full sm:w-[120px]">
                 <SelectValue placeholder="Remote" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">All</SelectItem>
                 <SelectItem value="remote">Remote</SelectItem>
                 <SelectItem value="onsite">On-site</SelectItem>
               </SelectContent>
             </Select>
             <Select value={sortBy} onValueChange={setSortBy}>
-              <SelectTrigger className="w-[120px]">
+              <SelectTrigger className="w-full sm:w-[120px]">
                 <SelectValue placeholder="Sort by" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="newest">Newest</SelectItem>
                 <SelectItem value="salary">Salary</SelectItem>
                 <SelectItem value="company">Company</SelectItem>
               </SelectContent>
             </Select>
           </div>
         </div>

         {/* Tabs */}
         <Tabs value={selectedTab} onValueChange={setSelectedTab}>
-          <TabsList>
+          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
             <TabsTrigger value="all">All Jobs ({jobs.length})</TabsTrigger>
             <TabsTrigger value="featured">Featured ({jobs.filter(j => j.featured).length})</TabsTrigger>
             <TabsTrigger value="new">New ({jobs.filter(j => j.status === 'new').length})</TabsTrigger>
             <TabsTrigger value="applied">Applied ({jobs.filter(j => j.applied).length})</TabsTrigger>
           </TabsList>
         </Tabs>
       </div>
)
)
}