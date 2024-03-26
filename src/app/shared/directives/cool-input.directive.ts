import {Directive, ElementRef, HostListener, OnInit, Renderer2, Input, HostBinding} from '@angular/core';

@Directive({
  selector: '[coolInput]'
})
export class CoolInputDirective implements OnInit {


  @Input() coolInputDefaultBgColor: string = 'white';
  @Input() coolInputFocusBgColor: string = 'orange';

  constructor(private el: ElementRef, private rend: Renderer2) {
    console.log(el.nativeElement)
  }

  private  _backgroundColor: string = '';
  @HostBinding('style.backgroundColor')
  get getBgColor() {
    return this._backgroundColor;
  }

  private  _isOnFocus: boolean = false;
  @HostBinding('class.isOnFocus')
  get getIsOnFocus() {
    return this._isOnFocus;
  }

  @HostListener('focus')
  onFocus() {
    this.changeElementBgColor(this.coolInputFocusBgColor);
    this._isOnFocus = true;
  }

  @HostListener('click', ['$event', 'target'])
  onClick(target: HTMLElement) {
    console.log(target)
  }


  @HostListener('blur')
  onBlur() {
    this.changeElementBgColor('white')
    this.rend.setStyle(this.el.nativeElement, 'background-color', 'white');

  }

  ngOnInit() {
    this.changeElementBgColor(this.coolInputDefaultBgColor)

    this.rend.setAttribute(this.el.nativeElement, 'placeholder',
      this.el.nativeElement.getAttribute('placeholder') + '*');

  }

  changeElementBgColor(color: string) {
    this._backgroundColor = color;
  }
}
