import Signin from './components/signin.js';
import Signup from './components/signup.js';

class App {

    constructor(body) {
        this.signin = new Signin(body);
        this.signup = new Signup(body);
    }

    init() {
        this.signin.render();
        this.addEventListener();
    }

    addEventListener() {
        this.signinEvents();
        this.signupEvents();
    }

    signinEvents() {
        this.signin.on('error', () => alert('Erro de autenticação'));
        this.signin.on('signin', (token) => {
            localStorage.setItem('token', `JWT ${token}`);
            alert('Você esta autenticado!');
        });
        this.signin.on('signup', () => this.signup.render());
    }

    signupEvents() {
        this.signup.on('error', () => alert('Erro no cadastro'));
        this.signup.on('signup', (res) => {
            alert(`${res.data.name} você foi cadastrado com sucesso!`);
            this.signin.render();
        });
    }
}

module.exports = App;