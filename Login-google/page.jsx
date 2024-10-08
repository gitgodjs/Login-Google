import { useRouter } from "next/navigation";

const checkToken = async (setUser, setUserRol) => {
  //Get user info from token
  const token = localStorage.getItem('token');

  if(token){
    const res = await apiFunctions.get_from_api_token("get_credentials_from_token", {}, token); //Api configurada para recibir token en el header
    res.json().then((data) => {
      setUser(data);    
      setUserRol(data.rol_id);
    });
    toast.success('Se a iniciado sesión correctamente.')
  }
}

const LandingPage = () => {

  const [user, setUser] = useState(null);
  const [userRol, setUserRol] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  
  useEffect(() => {
    checkToken(setUser, setUserRol);
  }, []);

  const API_URL = process.env.NEXT_PUBLIC_API_URL; // http://localhost:3000/api/

  return (
  <a href={`${API_URL}google-auth/redirect`} className="flex w-[80%] items-center justify-center max-w-xs mx-auto py-1 px-2 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
        <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
      </svg>
      <span className="p-1 text-gray-800 font-semibold">Continuar con Google</span>
  </a>
  );
