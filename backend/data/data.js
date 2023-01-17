//Esto seria la respuesta del backend luego de iniciar sesion correctamente
//API - getUser
export const usersInfo=[
    {
        name:"Daniel Santiago",
        lastName:"Rodriguez Pineda",
        username:"DaniPineda87",
        image:"https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg",
        email:"danielspineda87@gmail.com",
        password:"12345678",
        birthday:new Date(2002,10,25),
        isAdmin:false,
    },
    {
        name:"Juan Camilo",
        lastName:"Fernandez Buitrago",
        username:"JuanCamilo02",
        image:"https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg",
        email:"juanca02@gmail.com",
        password:"12345678",
        birthday:new Date(2002,5,13),
        isAdmin:true,
    }
]

export const payments=[
    {
        
    }
]

//API - getCategories
export const categories=[
    {
        idCategory:"1",
        name:"Todos",
        icon:"🎊"
    },
    {
        idCategory:"2",
        name:"Conciertos",
        icon:"🎤"
    },
    {
        idCategory:"3",
        name:"Deportes",
        icon:"⚽"
    },
    {
        idCategory:"4",
        name:"Teatro",
        icon:"🎭"
    },
    {
        idCategory:"5",
        name:"Familia",
        icon:"👪"
    },
    {
        idCategory:"6",
        name:"Foros",
        icon:"📢"
    },
    {
        idCategory:"7",
        name:"Festival",
        icon:"🎉"
    },
];

//API getEventsPopulars
//Place id from https://developers.google.com/maps/documentation/places/web-service/place-id
export const eventsUpload=[
    {
        name:"PRECARNAVAL AL CLUB",
        organizer:"Club Social Valledupar S.A",
        date:new Date(2023,1,21),
        participants:2000,
        totalTickets:5000,
        location:"CRA 8 # 11-95",
        placeId:"ChIJsWocKLW5io4RF5gcwsx8kyY",
        category:["1","7"],
        image:"https://tuboleta.com/imagenes/6390f9e785a53.jpg",
        place:"Club Social Valledupar",
        city:"Valledupar",
        hour:"8:00PM",
        minimAge:18,
        ticketPrice:25000,
    },
    {
        name:"GABY - MEDELLÍN",
        organizer:"Miryam Lucia Forero Giraldo",
        date:new Date(2023,2,2),
        participants:1000,
        totalTickets:1200,
        location:"Cl. 31b, Medellín, Belén",
        placeId:"ChIJ3wE7lY0pRI4RKVbUlSJlLhk",
        category:["1","4"],
        image:"https://tuboleta.com/imagenes/636d6bdbcad1f.jpg",
        place:"Teatro de la Universidad de Medellín",
        city:"Medellín",
        hour:"9:00PM",
        minimAge:8,
        ticketPrice:34000
    },
    {
        name:"HÉROES DEL SILENCIO Y CAIFANES • JAGUARES FILARMÓNICO / EL RITUAL DEL SILENCIO",
        organizer:"Germán Rock Events",
        date:new Date(2023,2,4),
        participants:2300,
        totalTickets:3000,
        location:"Cl. 41 # 57 - 30",
        placeId:"ChIJ2-JPY6wpRI4RLkHsAWxVH5Q",
        category:["1","2"],
        image:"https://tuboleta.com/imagenes/63a07dc02deb0.gif",
        place:"Teatro Metropolitano José Gutiérrez Gómez",
        city:"Medellín",
        hour:"7:30PM",
        minimAge:10,
        ticketPrice:45000
    },
    {
        name:"ANDRES CEPEDA - MEDELLÍN",
        organizer:"Gota Producciones S.A.S",
        date:new Date(2023,3,4),
        participants:3000,
        totalTickets:5000,
        location:"Cl. 31b, Medellín, Belén",
        placeId:"ChIJ3wE7lY0pRI4RKVbUlSJlLhk",
        category:["1","2"],
        image:"https://tuboleta.com/imagenes/639cd0d0dc9aa.jpg",
        place:"Teatro de la Universidad de Medellín",
        city:"Medellín",
        hour:"8:00PM",
        minimAge:7,
        ticketPrice:85000
    },
    {
        name:"BOYACÁ CHICÓ FÚTBOL CLUB S.A - ABONOS 2023",
        organizer:"Deportivo Boyacá Chicó Fútbol Club S.A",
        date:new Date(2023,3,4),
        participants:5000,
        totalTickets:15000,
        location:"32, Tunja, Boyacá",
        placeId:"ChIJyVJSVDd8ao4RSOYV2anjTrE",
        category:["1","3"],
        image:"https://tuboleta.com/imagenes/638e4181735df.jpg",
        place:"Estadio La Independencia",
        city:"Tunja",
        hour:"8:00PM",
        minimAge:5,
        ticketPrice:32000
    },
    {
        name:"DISCIPLINAR SIN LASTIMAR",
        organizer:"Alejandra Pinilla",
        date:new Date(2023,3,11),
        participants:1100,
        totalTickets:1400,
        location:"Cl. 10 # 5 - 32",
        placeId:"ChIJh-twfKiZP44R8KxnYB6zDHE",
        category:["1","6"],
        image:"https://tuboleta.com/imagenes/6388d5098d656.jpg",
        place:"Teatro Colón Bogotá",
        city:"Bogotá",
        hour:"9:00PM",
        minimAge:18,
        ticketPrice:38000
    },
]