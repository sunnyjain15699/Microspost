import { http } from './http';
import { ui } from './ui';

document.addEventListener('DOMContentLoaded', showPost);
document.querySelector('.post-submit').addEventListener('click', publishPost);
document.querySelector('#posts').addEventListener('click', deletePost);
document.querySelector('#posts').addEventListener('click', editPost);
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function showPost() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.paint(data))
        .catch(err => console.log(err))
}

function publishPost() {

    const titleEE = document.getElementById('title').value;
    const bodyYY = document.getElementById('body').value;
    const id = document.querySelector('#id').value;

    const data = {
        title: titleEE,
        body: bodyYY
    }


    if (titleEE === '' || bodyYY === '') {
        ui.showAlert(`Atleast fill "Something" duh `, 'alert alert-danger')
    }
    else {

        if (id === '') {
            http.post('http://localhost:3000/posts', data)
                .then(data => {
                    console.log(data)
                    ui.showAlert('Post Added Successfully', 'alert  alert-success');
                    ui.clearContent();
                    showPost();
                })
        } else {

            http.put(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    ui.showAlert('Post successfully updated', 'alert alert-success');
                    ui.changeState('add')
                    showPost();
            })
        }
    }
}

function deletePost(e) {
    if (e.target.classList.contains('fa-remove')) {
        console.log(e.target)
        console.log(document.querySelector('.card'))
        const id = e.target.parentElement.dataset.id;
        http.delete(`http://localhost:3000/posts/${id}`)
            .then(data => {
                ui.showAlert('Post Deleted', 'alert alert-danger');
                showPost();
            })
            .catch(err => {
                console.log(err)
            })
    }

    e.preventDefault();
}

function editPost(e) {
    if (e.target.classList.contains('extr') || e.target.parentElement.classList.contains('extr')) {
        console.log(e.target)
        const idPosted = e.target.parentElement.dataset.id;
        const titlePosted = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const bodyPosted = e.target.parentElement.previousElementSibling.textContent;


        const data = {
            id: idPosted,
            title: titlePosted,
            body: bodyPosted
        }

        ui.fillForm(data)

    }
    e.preventDefault()
}

function cancelEdit(e) {
    if(e.target.classList.contains('post-cancel')) {
      ui.changeState('add');
    }
  
    e.preventDefault();
  }

