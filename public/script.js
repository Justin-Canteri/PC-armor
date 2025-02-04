//LISTA PROCESSOR

// el DOMContentLoaded espera a que se termine de ejecutar el doom de html para luego ejectuar el siguiente codigo, sino el valor de las etiquetas no existiria (pues no de ejecuto por completo el html)
document.addEventListener('DOMContentLoaded', () => {
    const familyProcessorSelect = document.getElementById('Family_Processor'); // Busca el select correcto
    const validFamilies = ['i3', 'i5', 'i7', 'i9']; // Lista de sockets válidos

    if (!familyProcessorSelect) {
        console.log('Elemento con ID "Family_Processor" no encontrado.');
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
        const form = document.getElementById('processor');
        if (form) {
            form.style.display = '';
        }

        fetch(`/data/${selectedFamily}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los datos (${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                const motherBoardSelect = document.getElementById('processorfor');
                if (!motherBoardSelect) {
                    console.error('Elemento con ID "processorfor" no encontrado.');
                    return;
                }
                // Llena el select con las opciones obtenidas de la API
                motherBoardSelect.innerHTML = data.map(item => `<option value="${item['soket']}" data-extra="${item['consume']}">${item['family']}-${item['generation']}</option>`).join('');
                
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    });

    
    // Oculta el formulario al inicio
    const form = document.getElementById('processor');
    if (form) {
        form.style.display = 'none';
    }
    
});



//LISTA MOTHER

document.addEventListener('DOMContentLoaded', () => {
    const familyProcessorSelect = document.getElementById('processorfor'); // Busca el select correcto
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
                motherBoardSelect.innerHTML = data.map(item => `<option value="${item['socket_graphic']}" data-extra="${item['socket_ram']}" data-extra2="${item['socket_storage']}" data-extra3="${item['consume']}">
                    ${item['name']}
                    </option>`).join('');
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


//LISTA GRAPHIC
document.addEventListener('DOMContentLoaded', () => {
    const familyProcessorSelect = document.getElementById('mother_board'); // Busca el select correcto
    const validFamilies = ['PCIe_2_0_x16', 'PCIe_3_0_x16', 'PCIe_2_1_x16', 'PCIe_4_0_x16']; // Lista de sockets válidos

    if (!familyProcessorSelect) {
        console.log('Elemento con ID "mother_board" no encontrado.');
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
        const form = document.getElementById('graphic');
        if (form) {
            form.style.display = '';
        }

        fetch(`/data/mother/grafic/${selectedFamily}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los datos (${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                const motherBoardSelect = document.getElementById('graphic_for');
                if (!motherBoardSelect) {
                    console.error('Elemento con ID "mother_board" no encontrado.');
                    return;
                }
                // Llena el select con las opciones obtenidas de la API
                motherBoardSelect.innerHTML = data.map(item => `<option value="${item['consume']}">
                    ${item['name_graphic']}
                    </option>`).join('');
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    });

    
    // Oculta el formulario al inicio
    const form = document.getElementById('graphic');
    if (form) {
        form.style.display = 'none';
    }
    
});


//LISTA RAM
document.addEventListener('DOMContentLoaded', () => {
    const familyProcessorSelect = document.getElementById('mother_board'); // Busca el select correcto
    const validFamilies = ['DDR3', 'DDR4', 'DDR5']; // Lista de sockets válidos

    if (!familyProcessorSelect) {
        console.log('Elemento con ID "mother_board" no encontrado.');
        return;
    }

    familyProcessorSelect.addEventListener('change', (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const selectedFamily = selectedOption.dataset.extra; // Obtiene el valor seleccionado  CAMBIAR PARA USAR DATAEXTRA Y NO VALUE

        // Verifica si la familia es válida
        if (!validFamilies.includes(selectedFamily)) {
            console.error('Familia de procesador no válida:', selectedFamily);
            return;
        }

        // Oculta el formulario si no es válido
        const form = document.getElementById('ram');
        if (form) {
            form.style.display = '';
        }

        fetch(`/data/mother/grafic/ram/${selectedFamily}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los datos (${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                const motherBoardSelect = document.getElementById('ram_for');
                if (!motherBoardSelect) {
                    console.error('Elemento con ID "mother_board" no encontrado.');
                    return;
                }
                // Llena el select con las opciones obtenidas de la API
                motherBoardSelect.innerHTML = data.map(item => `<option value="${item['consume']}">
                    ${item['type']} - ${item['capacity']} - ${item['frequency']}
                    </option>`).join('');
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    });

    
    // Oculta el formulario al inicio
    const form = document.getElementById('ram');
    if (form) {
        form.style.display = 'none';
    }
    
});


//LISTA STORAGE
document.addEventListener('DOMContentLoaded', () => {
    const familyProcessorSelect = document.getElementById('mother_board'); // Busca el select correcto
    const validFamilies = ['SATA_3_Gb', 'SATA_6_Gb', 'NVMe']; // Lista de sockets válidos

    if (!familyProcessorSelect) {
        console.log('Elemento con ID "mother_board" no encontrado.');
        return;
    }

    familyProcessorSelect.addEventListener('change', (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const selectedFamily = selectedOption.dataset.extra2; // Obtiene el valor seleccionado  CAMBIAR PARA USAR DATAEXTRA Y NO VALUE

        // Verifica si la familia es válida
        if (!validFamilies.includes(selectedFamily)) {
            console.error('Familia de procesador no válida:', selectedFamily);
            return;
        }

        // Oculta el formulario si no es válido
        const form = document.getElementById('Storage');
        if (form) {
            form.style.display = '';
        }

        fetch(`/data/mother/grafic/ram/storage/${selectedFamily}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los datos (${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                const motherBoardSelect = document.getElementById('Storage_for');
                if (!motherBoardSelect) {
                    console.error('Elemento con ID "mother_board" no encontrado.');
                    return;
                }
                // Llena el select con las opciones obtenidas de la API
                motherBoardSelect.innerHTML = data.map(item => `<option value="${item['consumption']}">
                    ${item['type']} - ${item['capacity']} - ${item['socket_storage']}
                    </option>`).join('');
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    });

    
    // Oculta el formulario al inicio
    const form = document.getElementById('Storage');
    if (form) {
        form.style.display = 'none';
    }
    
});



//LISTA FONT
document.addEventListener('DOMContentLoaded', () => {
    const selects = ['processorfor', 'mother_board', 'graphic_for', 'ram_for', 'Storage_for'];
    const fontSelect = document.getElementById('font_for');

    // Función que calcula el consumo total
    function updateTotalConsumption() {
        let total = 0;

        selects.forEach(id => {
            const selectElement = document.getElementById(id);
            if (selectElement && selectElement.selectedIndex !== -1) {
                const selectedOption = selectElement.options[selectElement.selectedIndex];
                const consumption = parseFloat(selectedOption.dataset.extra || selectedOption.value) || 0;
                total += consumption;
            }
        });
        // Llamar a la API para actualizar la lista de fuentes con voltaje superior al total calculado
        updateFontOptions(total);
    }

    function updateFontOptions(total) {
        fetch(`/data/mother/grafic/ram/storage/font/${total}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los datos (${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                if (!fontSelect) {
                    console.error('Elemento con ID "font_for" no encontrado.');
                    return;
                }
                // Llena el select con las opciones de fuentes adecuadas
                fontSelect.innerHTML = data.map(item => `<option>${item['name']} - ${item['volt']}W, ${item['certification']}</option>`).join('');
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }

    // Agregar evento a cada select
    selects.forEach(id => {
        const selectElement = document.getElementById(id);
        if (selectElement) {
            selectElement.addEventListener('change', updateTotalConsumption);
        }
    });

    // Inicializar el cálculo de consumo al cargar la página
    updateTotalConsumption();
});
