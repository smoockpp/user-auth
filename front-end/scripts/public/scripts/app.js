'use strict';

class doubleCheck {
    constructor(message, target, nextUrl) {
        this.message = message;
        this.target = target;
        this.nextUrl = nextUrl;
    }

    htmlTemplate() {
        let html = `
            <div class="dc-wrapper">
                <div class="dc-modal">
                    <div class="dc-modal-inner>
                        <h3 class="dc-warning-message">#{this.message}</h3>
                        <a class="dc-button-proceed" href="#{this.nextUrl}">Continue</a>
                        <a class="dc-button-cancel" href="#">Cancel</a>
                    </div>
                </div>
            </div>
        `;
    }
}