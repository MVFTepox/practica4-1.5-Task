async function login(email, password) {
    try {
        const response = await fetch('http://localhost:3000/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json(); // Intentar leer el error en formato JSON
            console.error('Error en API:', errorData); // Mostrar el error de la API en consola
            throw new Error(errorData.message || 'Error obteniendo usuarios');
        }

        const users = await response.json();
        console.log('Usuarios obtenidos:', users);

        const user = users.find((u) => u.email === email);

        if (!user || user.password !== password) {
            throw new Error('Credenciales inválidas');
        }

        console.log('Usuario autenticado:', user);

        const taskStore = useTaskStore();
        await taskStore.fetchTasksByUserID(user.id);

        // Simulación de almacenamiento local
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Usuario guardado en localStorage:', user);

        return user; // Devuelve el usuario autenticado
    } catch (error) {
        console.error('Error en login:', error);
    }
}

login("123@123.com", "123")