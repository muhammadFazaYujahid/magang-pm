# magang-pm

# langkah awal:
uncomment kode di /api/src/index.js:
db.sync({ force: false })
     .then(async () => {
         console.log("Database Connection");
     })
     .catch((err) => console.log(err))

# setting email untuk server:
di file ./api/.env 
ubah bagian AUTH_EMAIL dengan email yang akan dipakai
ubah bagian AUTH_PASSWORD dengan password 2 factor verification
