export const checkError = (type,value) => {
    switch(type) {
        case 'email' :
            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) ) {
                return "Enter a valid e-mail address";
            }else{
                return "OK";
            };
            
        case 'nombre': 
            if (! /[a-zA-Z]/gi.test(value) ) {
                return "Enter a valid name";
            }else{
                return "OK";
            };

        default:
            return "OK";
    }
};