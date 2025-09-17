# Portfolio Next.js com shadcn/ui e GSAP

Este é um projeto de portfolio pessoal desenvolvido com Next.js, shadcn/ui e GSAP para criar efeitos parallax e animações avançadas.

## Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)
- [Radix UI](https://www.radix-ui.com/)

## Funcionalidades

- Design responsivo
- Tema dark/light
- Animações e transições suaves com GSAP
- Efeitos parallax
- Componentes reutilizáveis do shadcn/ui
- Seções de hero, projetos, sobre e contato

## Como Executar

Primeiro, instale as dependências:

```bash
npm install
```

Depois, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── lib/
│   └── utils.ts
└── app/
    └── globals.css
```

## Personalização

Você pode personalizar este portfolio modificando:

- `src/app/page.tsx` - Para alterar a estrutura das páginas
- `src/components/` - Para modificar os componentes
- `src/app/globals.css` - Para ajustar os estilos globais
- `tailwind.config.js` - Para configurar o Tailwind CSS

## Deploy

O jeito mais fácil de fazer o deploy do seu Next.js é usando a [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) do criador do Next.js.

Confira nossa [documentação de deploy Next.js](https://nextjs.org/docs/deployment) para mais detalhes.