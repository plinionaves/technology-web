import NTechnology from '../ntechnology.js';
import Template from '../templates/technologies.js';

class Technologies extends NTechnology {

    constructor(body) {
        super();
        this.body = body;
    }

    render() {
        this.renderTechnologyList();
    }

    addEventListener() {
        this.technologyRemoveClick();
    }

    renderTechnologyList() {

        const opts = {
            method: 'GET',
            url: `${this.URL}/technology`,
            json: true,
            headers: {
                authorization: localStorage.getItem('token')
            }
        };

        this.request(opts, (err, resp, returnedData) => {
            if (err) {
                this.emit('error', err);
            } else {
                this.body.innerHTML = Template.render(returnedData.data);
                this.addEventListener();
            }
        });
    }

    technologyRemoveClick() {
        const removes = this.body.querySelectorAll('[data-remove]');
        for(let i = 0, max = removes.length; i < max; i++) {
            removes[i].addEventListener('click', (e) => {

                e.preventDefault();
                if (confirm('Deseja excluir esta tecnologia?')) {
                    const id = e.target.getAttribute('data-technology-id');
                    const opts = {
                        method: 'DELETE',
                        url: `${this.URL}/technology/${id}`,
                        headers: {
                            authorization: localStorage.getItem('token')
                        }
                    };

                    this.request(opts, (err, resp, returnedData) => {
                        if (err || resp.status === 412) {
                            this.emit('remove-error', err);
                        } else {
                            this.emit('remove');
                        }
                    });
                }

            });
        }
    }
}

module.exports = Technologies;