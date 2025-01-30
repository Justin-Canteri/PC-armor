//LISTA PROCESSOR

// el DOMContentLoaded espera a que se termine de ejecutar el doom de html para luego ejectuar el siguiente codigo, sino el valor de las etiquetas no existiria (pues no de ejecuto por completo el html)

document.addEventListener('DOMContentLoaded', () => {
    const familyProcessorSelect = document.getElementById('Family_Processor'); // toma la id del select de las generaciones
    const validFamilies = ['i3', 'i5', 'i7', 'i9']; // crea una lista con las familias

    if (!familyProcessorSelect) {
        console.error('Elemento con ID "Family_Processor" no encontrado.');  //comprueba si el id del select de las generaciones existe
        return;
    }

    familyProcessorSelect.addEventListener('change', (event) => {  //  programo el evento
        const selectedFamily = event.target.value;   //tomo el value de las opciones que tiene la seleccion

        validFamilies.forEach(family => {
            const form = document.getElementById(`intel_${family}`);
            if (form) {
                form.style.display = (family === selectedFamily) ? '' : 'none';   // busco para cada uno de los elementos de la lista de familias el 
            }
        });

        if (!validFamilies.includes(selectedFamily)) {
            return;
        }

        fetch(`/data/${selectedFamily}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                return response.json();
            })
            .then(data => {
                const options = data.map(item => `<option value="${item['soket']}">${item['family']}-${item['generation']}</option>`).join('');
                document.getElementById(`Processor_${selectedFamily}`).innerHTML = options;
            })
            .catch(error => {
                console.error(error);
                document.getElementById(`Processor_${selectedFamily}`).innerHTML = 'Error al cargar los datos.';
            });
    });

    // Ocultar todos los formularios al inicio
    validFamilies.forEach(family => {
        const form = document.getElementById(`intel_${family}`);
        if (form) form.style.display = 'none';
    });
});


//LISTA MOTHER

document.addEventListener('DOMContentLoaded', () => {
    const familyProcessorSelect = document.getElementById('Processor_i3'); // Busca el select correcto
    const validFamilies = ['LGA_1156', 'LGA_1155', 'LGA_1150', 'LGA_1151', 'LGA_1200', 'LGA_1700']; // Lista de sockets válidos

    if (!familyProcessorSelect) {
        console.log('Elemento con ID "Processor_i3" no encontrado.');
        return;
    }

    familyProcessorSelect.addEventListener('change', (event) => {
        const selectedFamily = event.target.value; // Obtiene el valor seleccionado

        // Verifica si la familia es válida
        if (!validFamilies.includes(selectedFamily)) {
            console.error('Familia de procesador no válida:', selectedFamily);
            return;
        }

        // Oculta el formulario si no es válido
        const form = document.getElementById('mother');
        if (form) {
            form.style.display = '';
        }

        fetch(`/data/mother/${selectedFamily}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los datos (${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                const motherBoardSelect = document.getElementById('mother_board');
                if (!motherBoardSelect) {
                    console.error('Elemento con ID "mother_board" no encontrado.');
                    return;
                }
                // Llena el select con las opciones obtenidas de la API
                motherBoardSelect.innerHTML = data.map(item => `<option value="${item['socket_graphic']}">${item['name']}</option>`).join('');
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    });

    
    // Oculta el formulario al inicio
    const form = document.getElementById('mother');
    if (form) {
        form.style.display = 'none';
    }
    
});
