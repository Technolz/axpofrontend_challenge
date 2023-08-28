import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    OnInit,
} from '@angular/core';

@Directive({
    selector: '[appAutoHeight]'
})
export class AutoHeightDirective implements OnInit, AfterViewInit {
    @HostBinding('style.height')
    height = 'none';

    @HostListener('window:resize', ['$event']) onResize() {
        this.updateHeight();
    }

    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        this.updateHeight();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.updateHeight();
        });
    }

    private updateHeight() {
        const element = this.elementRef.nativeElement;

        const elementRect = element.getBoundingClientRect();
        const offset = elementRect.top;
        let elementHeight = (document.body.scrollHeight - offset - 20);

        const height = elementHeight + 'px';

        this.height = height;
    }
}
