const CACHE_NAME = "version-1"
const urlsToCache = ['index.html', 'offline.html']

const self = this; //just think that it's the syntax, we cannot write it directly cause it will be non-restricted global

// Install SW
self.addEventListener("install", (event) => {
    event.waitUntil(

        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened caches");

            return cache.addAll(urlsToCache)
        })
    ).catch((error) => console.log('Error adding URLs to cache:', error));
})

//Listen for requests
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(() => {
//this return means to fetch new data
            return fetch(event.request)
            //if we failed to catch data then we are offline and then it will load offline.html
            .catch(() => caches.match("offline.html"))
        })
    )

})

//Activate the SW
self.addEventListener("activate", (event) => { 
const cacheWhiteList = [];
cacheWhiteList.push(CACHE_NAME);

event.waitUntil(
    caches.keys().then((cacheNames)=>Promise.all(
        cacheNames.map((cacheNames)=>{ 

            if(!cacheWhiteList.includes(cacheNames)){
                return caches.delete(cacheNames)
            }
        })
    ))
)
 


})
