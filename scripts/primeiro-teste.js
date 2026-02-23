import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5, // Número de usuários virtuais
  duration: '10s', // Duração do teste
};

export default function () {
  const res = http.get('http://localhost:3000/produtos');

  check(res, {
    'Status=200': (r) => r.status === 200,
    'Resposta contem Produtos': (r) => r.body.includes('produtos'),
    'response time is less than 500ms': (r) => r.timings.duration < 500,
  });
}