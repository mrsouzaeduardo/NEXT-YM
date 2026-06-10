import { Project, ProcessStep } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'favorito-supermercado',
    title: 'Supermercado Favorito',
    subtitle: 'E-commerce & Delivery de Alimentos SaaS',
    description: 'Solução completa de mercado online com carrinho integrado em tempo real, navegação inteligente por departamentos e finalização via WhatsApp.',
    longDescription: 'Desenvolvido para conectar supermercados locais a seus clientes de forma rápida e eficiente. Possui uma navegação altamente responsiva por departamentos de hortifrúti, mercearia, carnes e bebidas, permitindo adicionar itens ao carrinho instantaneamente com cálculos dinâmicos de pesos e subtotais, e envio estruturado do pedido direto para a central de atendimento pelo WhatsApp.',
    url: 'https://supermercadofavorito.vercel.app/',
    tags: ['E-commerce', 'UX Fluida', 'Carrinho SaaS', 'WhatsApp API', 'Mobile-First'],
    color: 'emerald',
    accentColor: '#10b981',
    features: [
      'Navegação fluida por departamentos e busca inteligente de produtos.',
      'Carrinho flutuante interativo com atualização automática de preços.',
      'Integração nativa com WhatsApp (envio do pedido formatado com um clique).',
      'Layout ultra otimizado para celulares para facilitar as compras do dia a dia.'
    ],
    techStack: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion', 'WhatsApp Web Integrator'],
    mockStats: [
      { label: 'Tempo de Carregamento', value: '0.8s' },
      { label: 'Aumento em Vendas', value: '+42%' },
      { label: 'Retenção de Clientes', value: '88%' }
    ]
  },
  {
    id: 'wrp-construtora',
    title: 'WRP Construtora',
    subtitle: 'Portal Corporativo Premium & Vitrine Imobiliária',
    description: 'Portal majestoso para construtora civil com catálogo de empreendimentos, galeria de obras de alta qualidade e agendamentos de visitas guiadas.',
    longDescription: 'Um portal de engenharia e incorporações focado na experiência de alto luxo. Projetado para apresentar empreendimentos imobiliários com galerias de fotos expansivas, detalhes técnicos de andamento das obras (fases estrutural, acabamento, etc.), simulador conceitual de financiamento e agendamento de reuniões com consultores dedicados.',
    url: 'https://wrpconstrutora.vercel.app/',
    tags: ['Engenharia', 'Real Estate', 'UI de Alto Padrão', 'Status de Obras', 'B2C'],
    color: 'amber',
    accentColor: '#f59e0b',
    features: [
      'Galeria imersiva de projetos concluídos e lançamentos residenciais.',
      'Acompanhamento em barra de progresso do andamento físico das obras.',
      'Agendamento simplificado de visitas a decorados e decoradores parceiros.',
      'Calculadora de estimativas estruturais sob medida para novos investidores.'
    ],
    techStack: ['React 18', 'Tailwind Grid Systems', 'Motion Animations', 'Interactive Gantt Charts'],
    mockStats: [
      { label: 'Taxa de Conversão Leads', value: '24%' },
      { label: 'Tempo de Sessão Médio', value: '4:15m' },
      { label: 'SEO Score Lighthouse', value: '100/100' }
    ]
  },
  {
    id: 'dapper-style',
    title: 'Dapper Version 1',
    subtitle: 'Plataforma SaaS de Agendamento Moderno de Barbearia',
    description: 'Sistema elegante para barbearias de alto padrão e alfaiatarias com agendamento interativo de horários, serviços exclusivos e perfis de profissionais.',
    longDescription: 'A dapper é o ápice do estilo unindo tecnologia. Projetada com estética dark elegante, permite ao cliente selecionar combos completos de cabelo, barba e estilo geral, escolher o barbeiro favorito e reservar horários em uma grade em tempo real. Uma solução pioneira para digitalização e valorização de profissionais autônomos e barbearias boutique.',
    url: 'https://dapper-version1.vercel.app/',
    tags: ['SaaS de Agendamento', 'Dark Mode Estético', 'Luxo & Design', 'Calendário Interativo', 'B2C Premium'],
    color: 'sky',
    accentColor: '#0ea5e9',
    features: [
      'Interface em Dark Mode imersivo com fotos e design editorial refinado.',
      'Painel de agendamento interativo com bloqueio instantâneo de horários.',
      'Seção de equipe com fotos, conquistas e portfólio visual do barbeiro.',
      'Menu detalhado de rituais, serviços, cortes clássicos e barbas modeladas.'
    ],
    techStack: ['React', 'CSS Variables', 'Lucide Design Icons', 'Polished Interaction Engine'],
    mockStats: [
      { label: 'Redução de No-shows', value: '-75%' },
      { label: 'Agendamentos Online', value: '+150%' },
      { label: 'NPS de Satisfação', value: '98.4' }
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Imersão & Planejamento',
    description: 'Entendemos a essência do seu negócio, analisamos concorrentes e desenhamos a arquitetura ideal com foco total na melhor experiência de conversão.',
    iconName: 'Compass'
  },
  {
    number: '02',
    title: 'UI/UX Design de Alto Impacto',
    description: 'Criamos interfaces modernas e personalizadas utilizando as tendências visuais de ponta, priorizando fluidez móvel e acessibilidade.',
    iconName: 'Layers'
  },
  {
    number: '03',
    title: 'Desenvolvimento Express & SaaS',
    description: 'Codificamos com desempenho impecável, segurança nas transações, integrações diretas (WhatsApp, mídias) e pontuações máximas no Google Lighthouse.',
    iconName: 'Cpu'
  },
  {
    number: '04',
    title: 'Lançamento & Suporte VIP',
    description: 'Colocamos seu site no ar com CDN de alta performance, rastreamento analítico configurado e acompanhamento pós-lançamento da Next YM.',
    iconName: 'Rocket'
  }
];
