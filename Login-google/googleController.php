use Laravel\Socialite\Facades\Socialite;


// En este caso tenemos un controlador que se llama AuthController y manejamos los tokens atraves de auth()
public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback(Request $request)
    {
    // Obtener el usuario de Google
    $googleUser = Socialite::driver('google')->stateless()->user();
    $googleId = $googleUser->id;
    $googleEmail = $googleUser->email;
        try {
            

            // Verificar si el usuario ya existe en la base de datos
            $existingUser = User::where('google_id', $googleId)->first();
            if ($existingUser) {
                // Si el usuario existe, iniciar sesión y generar un token
                $token = auth()->login($existingUser);
            } else {
                // Si el usuario no existe, crear uno nuevo y generar un token
                $user = User::create([
                    'correo' => $googleEmail,
                    'google_id' => $googleId,
                    'password' => $googleId, // Contraseña ficticia para nuevos usuarios
                ]);
                $token = auth()->login($user);
            }

            // Enviar el token al frontend (El front esta preparado para chequear las credenciales sin errores de seguridad)
            return redirect('http://localhost:3000); // Redireccionar al frontend con el token

        } catch (Throwable $e) {
            // Verificar si el error se debe a un correo duplicado (puedes agregar lógica más robusta aquí)
            if (str_contains($e->getMessage(), 'Duplicate entry')) {
                // Si el error es por correo duplicado, retornar una uri especifica
                return redirect('http://localhost:3000/signup?error=email_in_use');
            }
        }
    }
