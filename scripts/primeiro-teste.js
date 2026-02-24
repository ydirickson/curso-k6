import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5, // Número de usuários virtuais
  //duration: '10s', // Duração do teste
  iterations: 1000, // Número total de iterações
};

export function setup(){
  console.log('Iniciando o teste de carga...');
  return { baseUrl: 'http://localhost:3000' };
}

export default function (data) {
  const res = http.get(`${data.baseUrl}/produtos`);

  console.log(`Status: ${res.status}, Tempo de resposta: ${res.timings.duration}ms`);
  
  check(res, {
    'Status=200': (r) => r.status === 200,
    'Resposta contem Produtos': (r) => r.body.includes('produtos'),
    'response time is less than 500ms': (r) => r.timings.duration < 500,
  });
}

export function teardown() {
  console.log('Teste de carga concluído.');
}