
const api = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://207.148.13.90:8091/portal-api/cst',
    headers: {
        'content-type': 'application/json',
    }
});

api.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbiIsImV4cCI6MTU3MTQwNTMxOX0.ZWg6RRP96vyZbUretflsVppQaDoLmSy6-cN7qFMwA4mPIbxC6diAFW4AEB7ipcamQ-EEsokIEYeG6MVCLNQM4Q';

var vm = new Vue({
    el: "#app",

    data: {
        id: '',
        codigo: '',
        descricao: '',
        tipoentradasaida: '',
        delete: '',
        todos: [],
    },

    methods: {  

        editCST(exato) {
            
            var filterResultado = this.todos.filter((value, index, array) => {

                return value.id === exato;

            });

            this.id = filterResultado[0].id
            this.codigo = filterResultado[0].codigo
            this.descricao = filterResultado[0].descricao
            this.tipoentradasaida = filterResultado[0].tipoentradasaida

        },


        deletarCST() {

            var url = `/removerporid?id=${this.delete}`

            api.delete(url)
                .then((result) => {

                   window.location.reload()

                }).catch((err) => {
                    console.log(err);
                });

        },

        incluirCST(){

            api.post('/criar', {
                codigo: this.codigo,
                descricao: this.descricao,
                entrada: this.tipoentradasaida
            })
            
            .then((result) => {

                window.location.reload();
                                
            }).catch((err) => {
                console.log(err);
            });

        },

        editarCST(){
            
            api.post('/atualizar', {
                id: this.id,
                codigo: this.codigo,
                descricao: this.descricao,
                entrada: this.tipoentradasaida,
            })
            .then((result) => {

                window.location.reload();

            }).catch((err) => {
                console.log(err);
            });

        },

        LimparCampos() {
            this.codigo = ""
            this.descricao = ""
            this.tipoentradasaida = ""
        },

        passarID(id) {
            this.delete = id
        },

        getCST() {

            api.get('/listar')
                .then((response) => {
                    
                    this.todos = response.data
                    console.log(response.data);

                }).catch((err) => {
                    console.log(err);
                });

        },

    },

    created() {
        this.getCST()
    },

})