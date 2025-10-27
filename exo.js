function updateAttendance() {
        const tbody = document.querySelector('table tbody');
        if (!tbody) return;
        const rows = Array.from(tbody.querySelectorAll('tr'));
        rows.forEach(row => {
          const inputs = Array.from(row.querySelectorAll('input[type="checkbox"]'));
          if (inputs.length === 0) return; 

          let absences = 0;
          let participations = 0;
          
          inputs.forEach((input, idx) => {
            if (idx % 2 === 0) {
              if (!input.checked) absences++;
            } else {
              if (input.checked) participations++;
            }
          });

          
          row.classList.remove('green', 'yellow', 'red');
          if (absences < 3) row.classList.add('green');
          else if (absences <= 4) row.classList.add('yellow');
          else row.classList.add('red');

          
          let message = '';
          if (absences < 3) {
            message = (participations >= 4)
              ? 'Good attendance – Excellent participation'
              : 'Good attendance – You need to participate more';
          } else if (absences <= 4) {
            message = (participations >= 4)
              ? 'Warning – attendance low – Good participation'
              : 'Warning – attendance low – You need to participate more';
          } else {
            message = (participations >= 4)
              ? 'Excluded – too many absences – Good participation'
              : 'Excluded – too many absences – You need to participate more';
          }

          const msgCell = row.querySelector('td:last-child');
          if (msgCell) {
            msgCell.textContent = `${message} (Absences: ${absences}, Participations: ${participations})`;
            msgCell.setAttribute('title',` ${message} — Absences: ${absences}, Participations: ${participations}`);
          }
        });
      }

      document.addEventListener('DOMContentLoaded', () => {
        updateAttendance();
        const checkboxes = document.querySelectorAll('table input[type="checkbox"]');
        checkboxes.forEach(cb => cb.addEventListener('change', updateAttendance));
      });
