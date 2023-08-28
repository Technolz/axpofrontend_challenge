import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export interface Language {
    code?: string;
    logo?: string;
};

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    DEFAULT_LANGUAGE = 'es';

    currentLanguage: BehaviorSubject<string>;

    constructor(private translateService: TranslateService) {
        this.currentLanguage = new BehaviorSubject<string>(this.DEFAULT_LANGUAGE);

        this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
            this.currentLanguage.next(langChangeEvent.lang);
        });
    }

    public getCurrentLanguage(): BehaviorSubject<string> {
        return this.currentLanguage;
    }

    public setCurrentLanguage(language: string) {
        this.translateService.use(language);
    }
}
