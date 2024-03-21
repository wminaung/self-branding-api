
01. register - http://localhost:3000/sign-up

    -POST  :

    -payload : 
{
    "name": "aung",
    "email": "aung@gmail.com",
    "password": "hello"
}
    
    -response : (no cookie set)
    {...user}


02. login - http://localhost:3000/sign-in

    -POST :
    -payload :
{
    "email": "aung@gmail.com",
    "password": "hello"
}

    -response : (cookie set - <token> )
    {...user}
