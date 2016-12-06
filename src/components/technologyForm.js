import NTechnology from '../ntechnology.js';
import Template from '../templates/technologyForm.js';

class TechnologyForm extends NTechnology {

    constructor(body) {
        super();
        this.body = body;
    }

    render() {
        this.body.innerHTML = Template.render();
        this.body.querySelector('[data-technology]').focus();
        this.addEventListener();
    }

    addEventListener() {
        this.formSubmit();
    }

    formSubmit() {
        const form = this.body.querySelector('form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const technology = e.target.querySelector('[data-technology]');
            const note = e.target.querySelector('[data-note]');
            const opts = {
                method: 'POST',
                url: `${this.URL}/technology`,
                json: true,
                headers: {
                    authorization: localStorage.getItem('token')
                },
                body: {
                    name: technology.value,
                    note: note.value
                }
            };

            this.request(opts, (err, resp, data) => {
                if (err || resp.status === 412) {
                    this.emit('error');
                } else {
                    this.emit('submit');
                }
            });
        });
    }

}

module.exports = TechnologyForm;