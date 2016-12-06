import NTechnology from '../ntechnology.js';
import Template from "../templates/user.js";

class User extends NTechnology {

    constructor(body) {
        super();
        this.body = body;
    }

    render() {
        this.renderUserData();
    }

    addEventListener() {
        this.userCancelClick();
    }

    renderUserData() {
        const opts = {
            method: "GET",
            url: `${this.URL}/user`,
            json: true,
            headers: {
                authorization: localStorage.getItem("token")
            }
        };

        this.request(opts, (err, resp, returnedData) => {
            if (err || resp.status === 412) {
                this.emit("error", err);
            } else {
                this.body.innerHTML = Template.render(returnedData.data);
                this.addEventListener();
            }
        });
    }

    userCancelClick() {
        const button = this.body.querySelector("[data-remove-account]");

        button.addEventListener("click", (e) => {
            e.preventDefault();

            if (confirm("Tem certeza que deseja excluir sua conta?")) {
                const opts = {
                method: "DELETE",
                    url: `${this.URL}/user`,
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                };

                this.request(opts, (err, resp, data) => {
                    if (err || resp.status === 412) {
                        this.emit("remove-error", err);
                    } else {
                        this.emit("remove-account");
                    }
                });
            }
        });
    }
}

module.exports = User;