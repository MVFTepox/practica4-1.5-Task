import { defineStore } from "pinia";


export const useHistoryStore = defineStore('history', {
    state: () => ({
        history: [] as Array<{
            id: string;
            userID: string;
            title: string;
            content: string;
            dateStart: string;
            dateEnd: string | null;
        }>,
    }),
    actions: {
        async fetchHistoryByUserID(userID: string) {
            try {
                const response = await fetch(`http://localhost:3000/api/history/${userID}`);
                if (!response.ok) {
                    throw new Error(`Error obteniendo historial del usuario con ID ${userID}`);
                }
                const dataHISTORY = await response.json();
                this.history = dataHISTORY;
            } catch (error) {
                console.error('Error en fetchHistoryByUserID:', error);
            }
        },
        
        //SUBIR UNA TAREA AL HISTORIAL 
        async createHistory(userID: string, title: string, content: string, dateStart: string, dateEnd: string | null) {
            try {
                const response = await fetch('http://localhost:3000/api/history', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userID,
                        title,
                        content,
                        dateStart,
                        dateEnd,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error creando historial');
                }

                const dataHISTORY = await response.json();
                this.history.push(dataHISTORY);
            } catch (error) {
                console.error('Error en createHistory:', error);
            }
        },

        
        async deleteAllHistoryForID(id: string) {
            try {
                const response = await fetch(`http://localhost:3000/api/history/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`Error eliminando historial con ID ${id}`);
                }
                this.history = this.history.filter(history => history.id !== id);
            } catch (error) {
                console.error('Error en deleteAllHistoryForID:', error);
            }
        },



    },
    

})