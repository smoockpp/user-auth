'use strict';

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
    }
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for(var i = this.length - 1; i >= 0; i--) {
            if(this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    }

class doubleCheck extends HTMLElement {
    constructor() {
        super();
        this.message = '';
        this.nextUrl = '';
        this.toRemove = NodeSelector;
        this.appendTo = NodeSelector;
        this.proceed = String;
    }

    set properties(obj) {
        this.message = obj.message;
        this.nextUrl = obj.nextUrl;
        this.attachTo = obj.appendTo;
        this.proceed = obj.proceed;
    }

    attachedCallback() {
        this.innerHTML = `
            <style>#dc-wrapper{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.7);z-index:9999}#dc-wrapper #dc-modal{max-width:80%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#eee;padding:1rem 1rem}#dc-wrapper #dc-modal #dc-modal-inner{min-height:150px;display:flex;flex-flow:row wrap;align-items:center}#dc-wrapper #dc-modal #dc-modal-inner .dc-warning-message{line-height:1.2;flex-basis:100%;text-rendering:optimizeLegibility}#dc-wrapper #dc-modal #dc-modal-inner .dc-button-proceed{background:0 0;font-size:1.2rem;color:#006004;padding:10px 15px;margin:.5rem .5rem;border:1px solid #006004;line-height:1;transition:.2s all ease-in-out}#dc-wrapper #dc-modal #dc-modal-inner .dc-button-proceed:hover{transform:scale(1.1);text-decoration:none}#dc-wrapper #dc-modal #dc-modal-inner .dc-button-cancel{background:0 0;font-size:1.2rem;color:#680800;padding:10px 15px;margin:.5rem .5rem;border:1px solid #680800;line-height:1;transition:.2s all ease-in-out;margin-left:auto}#dc-wrapper #dc-modal #dc-modal-inner .dc-button-cancel:hover{transform:scale(1.1);text-decoration:none}#dc-wrapper #dc-modal #dc-modal-inner .dc-button-close{position:absolute;top:0;right:0;padding:.5rem;font-size:1.5rem;line-height:1;color:#333;transition:.5s all ease-in-out}#dc-wrapper #dc-modal #dc-modal-inner .dc-button-close:hover{transform:scale(1.3);text-decoration:none}</style>
            <div id="dc-wrapper">
                <div id="dc-modal">
                    <div id="dc-modal-inner">
                        <h4 class="dc-warning-message">${this.message}</h4>                        
                        <a class="dc-button-cancel" href="#">Cancel</a>
                        <a class="dc-button-proceed" href="${this.nextUrl}" data-continue="">Continue</a>
                        <a class="dc-button-close" href="#">&#10006;</a>
                    </div>
                </div>
            </div>
        `;
        // const parent = this.getElementById('dc-wrapper').parentNode;
        const btnCancel = this.querySelector('.dc-button-cancel');
        const btnClose = this.querySelector('.dc-button-close');
        const btnProceed = this.querySelector('.dc-button-proceed');
        function templateHTML(that) {
            const parentEl = that.parentNode;
            const parentParentEl = parentEl.parentNode;
            const parentx3 = parentParentEl.parentNode;
            console.log(parentx3.parentNode);
            parentx3.parentNode.parentNode.removeChild(parentx3.parentNode);
        }
        btnCancel.addEventListener('click',function() {
            templateHTML(this);
        });
        btnClose.addEventListener('click',function() {
            templateHTML(this);
        });
        btnProceed.addEventListener('click', function() {
            this.setAttribute('data-continue', 'true');
        });

    }

}

const Modal = document.registerElement('dc-modal', doubleCheck);
var myModal = new Modal;
myModal.properties = {
    message: 'Do you want to delete your account?',
    nextUrl: '/profile/delete',
    proceed: 'true'
}

const btnDanger = document.getElementsByClassName('btn-danger');
const state;
console.log(btnDanger);
for (let i = 0; i < btnDanger.length; i++) {
    btnDanger[i].addEventListener('click', function(e) {
        state = e;
        e.preventDefault();
        document.body.appendChild(myModal);
        const proceed = document.querySelector('.dc-button-proceed');
        proceed.addEventListener('click', function() {
            // if (this.getAttribute('data-continue') == )
        });
    });
}
