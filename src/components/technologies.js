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
        this.technologyDoneCheckbox();
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

    technologyDoneCheckbox() {
        const dones = this.body.querySelectorAll('[data-done]');

        for(let i = 0, max = dones.length; i < max; i++) {
            dones[i].addEventListener('click', (e) => {

                e.preventDefault();
                const id = e.target.getAttribute('data-technology-id');
                const done = e.target.getAttribute('data-technology-done');
                const opts = {
                    method: 'PUT',
                    url: `${this.URL}/technology/${id}`,
                    headers: {
                        authorization: localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        done: !done
                    })
                };
                this.request(opts, (err, resp, returnedData) => {
                    if (err || resp.status === 412) {
                        this.emit('update-error', err);
                    } else {
                        this.emit('update');
                    }
                });
            });
        }
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