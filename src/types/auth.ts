
export type AuthForm = {
  email: string;
  password: string;
};

export type LoginResponse ={
    message:string;
    success:boolean;
    user:{
        id:string;
        email:string;
    };
    token:string
}