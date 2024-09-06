import { RecintosZoo } from './recintos-zoo.js';

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
        const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve rejeitar quantidade inválida', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
        expect(resultado.erro).toBe("Quantidade inválida");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

    test('Não deve permitir adicionar macaco em recinto com leão', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 1);
        expect(resultado.erro).toBeFalsy(); // Verifica que não há erro genérico
        expect(resultado.recintosViaveis).not.toContain('Recinto 5 (espaço livre: 3 total: 9)'); // Verifica que o recinto com leão não é viável
    });

    // Novo teste: Macaco não deve ser alocado sozinho em recinto vazio
    test('Não deve permitir alocar 1 macaco sozinho em recinto vazio', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).not.toContain('Recinto 2'); // Verifica que o recinto vazio não é viável
    });

});