
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const mockPokemon: SimplePokemon = {
    id: '1',
    name: 'bulbasaur',
}

describe('PokemonCardComponent', () => {
    let fixture: ComponentFixture<PokemonCardComponent>

    let compiled: HTMLElement

    let component: PokemonCardComponent

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PokemonCardComponent],
            providers: [provideRouter([])],
        }).compileComponents();
        fixture = TestBed.createComponent(PokemonCardComponent);
        fixture.componentRef.setInput('pokemon', mockPokemon)

        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should have the SimplePokeon signal inputValue', () => {
        expect(component.pokemon()).toEqual(mockPokemon)
    })

    it('should render de pokemon name and imageb correctly', () => {
        console.log(compiled)
        expect(compiled.querySelector('img')?.getAttribute('src')).toContain(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${mockPokemon.id}.png`)
        expect(compiled.querySelector('h2')?.textContent).toContain(mockPokemon.name)
    })

    it('should have the proper ng-reflect-router-link', () => {
        const divWithLink = compiled.querySelector('div');

        expect(divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value).toBe(`/pokemons/${mockPokemon.name}`)
    })

});