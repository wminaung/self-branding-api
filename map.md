export enum Auth {
SIGN_IN = "SignIn",
SIGN_UP = "SignUp",
}

1.  register - http://localhost:3000/sign-up

        -POST  :

        -payload :

    {
    "name": "aung",
    "email": "aung@gmail.com",
    "password": "hello",
    isGoogleAuth?: boolean | null;
    }

        -response : (no cookie set)
        {...user}

2.  login - http://localhost:3000/sign-in

        -POST :
        -payload :

    {
    "email": "aung@gmail.com",
    "password": "hello",
    isGoogleAuth?: boolean | null;
    }

        -response : (cookie set - <token> )
        {...user}
