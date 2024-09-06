export class RecintosZoo {
  constructor() {
      this.recintos = [
          { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
          { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
          { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
          { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
          { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
      ];

      this.animais = {
          LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
          LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
          CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
          MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
          GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
          HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
      };
  }

  analisaRecintos(especie, quantidade) {
      console.log(`Verificando recintos para ${quantidade} ${especie}(s)`);

      if (!this.animais[especie]) {
          console.log('Animal inválido');
          return { erro: "Animal inválido", recintosViaveis: null };
      }

      if (quantidade <= 0) {
          console.log('Quantidade inválida');
          return { erro: "Quantidade inválida", recintosViaveis: null };
      }

      const animal = this.animais[especie];
      const tamanhoTotalNecessario = quantidade * animal.tamanho;
      console.log(`Espaço necessário para ${quantidade} ${especie}(s): ${tamanhoTotalNecessario}`);
      
      const recintosViaveis = [];

      for (const recinto of this.recintos) {
          const { bioma, tamanho, animais: animaisNoRecinto } = recinto;

          console.log(`Verificando Recinto ${recinto.numero}: Bioma - ${bioma}, Tamanho - ${tamanho}, Animais - ${JSON.stringify(animaisNoRecinto)}`);

          // Verificar se o bioma é compatível
          if (!animal.biomas.includes(bioma) && !(bioma === 'savana e rio' && animal.biomas.includes('savana'))) {
              console.log(`Recinto ${recinto.numero} tem bioma incompatível`);
              continue;
          }

          // Verificar convivência de carnívoros
          const hasCarnivoro = animaisNoRecinto.some(animal => this.animais[animal.especie].carnivoro);
          if (hasCarnivoro && especie !== animaisNoRecinto[0].especie) {
              console.log(`Recinto ${recinto.numero} já tem carnívoro. Não é possível adicionar ${especie}.`);
              continue; // Recinto com carnívoro existente, não pode adicionar outra espécie
          }

          // Regra: Macaco não pode ficar sozinho no recinto
          if (especie === 'MACACO' && animaisNoRecinto.length === 0 && quantidade < 2) {
              console.log(`Macaco não pode ficar sozinho no Recinto ${recinto.numero}`);
              continue; // Macaco não pode ficar sozinho
          }

          const ocupacaoAtual = this.calcularOcupacao(animaisNoRecinto);
          const ocupacaoExtra = (animaisNoRecinto.length > 0 && animaisNoRecinto[0].especie !== especie) ? 1 : 0;
          const espacoLivre = tamanho - ocupacaoAtual - ocupacaoExtra;

          console.log(`Recinto ${recinto.numero}: Ocupação atual - ${ocupacaoAtual}, Ocupação extra - ${ocupacaoExtra}, Espaço livre - ${espacoLivre}`);

          if (espacoLivre >= tamanhoTotalNecessario) {
              console.log(`Recinto ${recinto.numero} é viável. Espaço livre após inclusão: ${espacoLivre - tamanhoTotalNecessario}`);
              recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - tamanhoTotalNecessario} total: ${tamanho})`);
          } else {
              console.log(`Recinto ${recinto.numero} não tem espaço suficiente.`);
          }
      }

      if (recintosViaveis.length === 0) {
          console.log('Nenhum recinto viável encontrado');
          return { erro: "Não há recinto viável", recintosViaveis: null };
      }

      console.log(`Recintos viáveis encontrados: ${JSON.stringify(recintosViaveis)}`);

      return { recintosViaveis };
  }

  calcularOcupacao(animaisNoRecinto) {
      let ocupacao = 0;
      for (const animal of animaisNoRecinto) {
          ocupacao += animal.quantidade * this.animais[animal.especie].tamanho;
      }
      return ocupacao;
  }
}
