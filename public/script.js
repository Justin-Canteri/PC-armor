document.addEventListener('DOMContentLoaded', () => {
    const familyProcessorSelect = document.getElementById('Family_Processor');
    const validFamilies = ['i3', 'i5', 'i7', 'i9'];

    if (!familyProcessorSelect) {
        console.error('Elemento con ID "Family_Processor" no encontrado.');
        return;
    }

    familyProcessorSelect.addEventListener('change', (event) => {
        const selectedFamily = event.target.value;

        validFamilies.forEach(family => {
            const form = document.getElementById(`intel_${family}`);
            if (form) {
                form.style.display = (family === selectedFamily) ? '' : 'none';
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


//------------------- opciones de processor
//------------------- opciones de motherboard


document.addEventListener('DOMContentLoaded', () => {
    const formI3 = document.getElementById('mother');
    const familyProcessorSelect = document.getElementById('Processor_i3');
  
    if (formI3) {
        formI3.style.display = 'none';
    } else {
        console.error('Elemento con ID "i9" no encontrado.');
    }
    //Como hablamos de una lista, no funciona el click, sino el change
    if (familyProcessorSelect) {
        familyProcessorSelect.addEventListener('change', (event) => {
            const selectedValue = event.target.value;
  
            if (selectedValue === 'LGA 1156') {
                formI3.style.display = ''; // Muestra el formulario
                fetch('/data/mother/LGA1156').then((response) => {
                  if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                  }
                  return response.json();
                })
                .then((data) => {
                      const resultado = data.map((item) => `<option>${JSON.stringify(item['name'])}</option>`).join('');
                      document.getElementById('mother_board').innerHTML = `<option>${resultado}</option>`;
                })
                .catch((error) => {
                  console.error(error);
                  document.getElementById('mother_board').innerHTML = 'Error al cargar los datos.';
                });
            } else if (formI3) {
                formI3.style.display = 'none'; // Oculta el formulario si se selecciona otra opción
            }
        });
    } else {
        console.error('Elemento con ID "Family_Processor" no encontrado.');
    }
  });


