class UI {
    constructor() {
        this.id = document.getElementById('id');
        this.title = document.getElementById('title');
        this.body = document.getElementById('body');
        this.posts = document.getElementById('posts');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    paint(posts) {
        let output = '';
        posts.forEach((post) => {
            output += `
                <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="extr edit card-link" data-id="${post.id}">
                    <i class=" extr fa fa-pencil"></i>
                    </a>
                    <a href="#" class="delete card-link" data-id="${post.id}">
                    <i class="fa fa-remove"></i></a>
                </div>
                </div>`

        });
        this.posts.innerHTML = output;
    }

    showAlert(message, className) {
        this.clearAlert();

        const div = document.createElement('div')
        div.className = `${className} center`;
        div.id = 'hey';
        div.appendChild(document.createTextNode(message))
        const popup = document.getElementById('popup')
        popup.appendChild(div)

        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearContent() {
        document.getElementById('title').value = '';
        document.getElementById('body').value = '';
    }

    clearAlert() {
        const hey = document.querySelector('#hey');
        if (hey) {
            hey.remove();
        }
    }

    fillForm(data) {
        this.id.value = data.id
        this.title.value = data.title
        this.body.value = data.body
        this.changeState('edit')
    }

    alreadybutton(){
        const cancel = document.querySelector('.post-cancel')
        if(cancel){
            cancel.remove();
        }
    }

    clearId() {

        this.id.value = '';
    }

    changeState(type) {
        if (type === 'edit') {
            this.alreadybutton()
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';

            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-dark btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'))
            const formEnd = document.querySelector('.card-form')
            formEnd.appendChild(button);
        } else {
            this.postSubmit.textContent = 'Post It';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';

            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove()
            }

            this.clearContent();
            this.clearId()
        }

    }

}

export const ui = new UI();