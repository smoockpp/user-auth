'use strict';



class doubleCheck {
    constructor(message, target, nextUrl) {
        this.message = message;
        this.target = target;
        this.nextUrl = nextUrl;
        this.toRemove = [];
    }

    htmlTemplate() {
        let html = `
            <div class="dc-wrapper">
                <div class="dc-modal">
                    <div class="dc-modal-inner">
                        <h4 class="dc-warning-message">${this.message}</h4>                        
                        <a class="dc-button-cancel" href="#">Cancel</a>
                        <a class="dc-button-proceed" href="${this.nextUrl}">Continue</a>
                        <a class="dc-button-close" href="#">&#10006;</a>
                    </div>
                </div>
            </div>
        `;
        return html;
    }

    init() {
        this.target.innerHTML += this.htmlTemplate();
        const that = this;
        const dcCancel = document.getElementsByClassName('dc-button-cancel');
        for (let i = 0; i < dcCancel.length; i++) {
            dcCancel[i].addEventListener('click', function(e) {
                e.preventDefault();
                that.close();
            });
        }
        const dcClose = document.getElementsByClassName('dc-button-close');
        for (let i = 0; i < dcClose.length; i++) {
            dcClose[i].addEventListener('click', function(e) {
                e.preventDefault();
                that.close();
            });
        }
        const dcWrapper = document.getElementsByClassName('dc-wrapper');
        for (let i = 0; i < dcWrapper.length; i++) {
            this.toRemove.push(dcWrapper[i]);
        }
        
        console.log(this.toRemove)
    }
    close() {
        const that = this;
        for (dc in this.toRemove) {
            that.target.removeChild(this.toRemove[dc]);
        }
    }
}

const body = document.body;

let dc = new doubleCheck('Are you sure you want to delete your account?!', body, '/delete');


