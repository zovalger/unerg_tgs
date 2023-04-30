export const driverSocketService = (socket,io)=>{
  const { authCookie } = parse(socket.request.headers.cookie || "");

  console.log(authCookie);
}