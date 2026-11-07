# Guia de Design e Arquitetura (Design System & Wireframe)
**Referência base:** Landing Page de Saúde / Especialidades (Ex: Dra. Paula Dias)  
**Objetivo do Template:** Alta conversão em agendamentos (WhatsApp/Contato), geração de autoridade e acolhimento para serviços de saúde, clínicas ou profissionais liberais.

---

## 1. Identidade Visual e Atmosfera (Look & Feel)

O design do site segue uma abordagem **Acolhedora, Limpa e Humanizada**. Em vez de um aspecto hospitalar frio, utiliza-se uma estética suave que transmite tranquilidade, empatia e segurança (ideal para pediatria, psicologia, odontologia humanizada ou estética).

### 1.1. Diretrizes de Cores (Sugestão de Tokens)
Para replicar a harmonia visual em outro projeto, utilize a seguinte lógica de distribuição cromática:

*   **Background Principal (`--bg-primary`):** Branco puro (`#FFFFFF`) ou Off-white muito suave (`#FAF8F5` / `#F9FAFB`) para evitar cansaço visual.
*   **Background Secundário / Seções Alternadas (`--bg-secondary`):** Tons pastéis suaves (ex: Rosa suave `#FDF2F8`, Lilás claro `#F5F3FF`, Verde menta suave `#F0FDF4` ou Azul serenidade `#EFF6FF`). Usado para destacar blocos importantes como "Diferenciais" ou "Destaque de Serviço".
*   **Cor Primária da Marca (`--brand-primary`):** Tom médio/vibrante acolhedor (ex: Rosa/Magenta suave, Roxo/Lilás ou Azul Turquesa) aplicado em títulos de seção, ícones e detalhes visuais.
*   **Cor de Ação / CTA (`--cta-color`):** Cor de alto contraste para botões de agendamento (frequentemente Verde WhatsApp `#25D366` ou um tom forte complementar da paleta principal, com hover escuro).
*   **Texto Principal (`--text-primary`):** Cinza chumbo escuro (`#1F2937` ou `#334155`) — nunca preto puro (`#000000`), para manter a suavidade.
*   **Texto Secundário (`--text-secondary`):** Cinza médio (`#4B5563` ou `#64748B`) para parágrafos descritivos.

### 1.2. Tipografia
*   **Títulos (Headings - H1, H2, H3):** Fontes Sans-Serif arredondadas ou geométricas amigáveis (ex: *Poppins*, *Quicksand*, *Nunito* ou *Montserrat*). Peso `600` (Semi-bold) ou `700` (Bold).
*   **Corpo de Texto (Body):** Fontes de alta legibilidade (ex: *Inter*, *Open Sans* ou *DM Sans*). Peso `400` (Regular), altura de linha generosa (`line-height: 1.6`).

### 1.3. Estilo dos Componentes (UI)
*   **Bordas Arredondadas (`border-radius`):** Uso intenso de cantos suaves. Cards com `16px` a `24px` (`rounded-2xl` ou `rounded-3xl`) e botões em formato pílula (`9999px` / `rounded-full`).
*   **Sombras (`box-shadow`):** Sombras difusas e muito leves (`0 10px 30px -5px rgba(0, 0, 0, 0.05)`) para dar flutuação aos cards sem pesar o layout.
*   **Fotografia:** Fotos reais do profissional sorrindo, interagindo com pacientes e mostrando o ambiente físico. **Regra de ouro:** Evitar fotos genéricas de banco de imagens.

---

## 2. Arquitetura de Seções (Wireframe Estrutural)

A página é uma **Landing Page Single-Page** dividida em 9 blocos estratégicos voltados para a jornada de convencimento do paciente (Atenção $\rightarrow$ Interesse $\rightarrow$ Confiança $\rightarrow$ Ação).

---

### Seção 1: Hero Section (Dobra Principal)
*   **Objetivo:** Identificação imediata do profissional, proposta de valor clara e primeiro botão de conversão.
*   **Layout:** Grid de 2 colunas no Desktop (Texto à esquerda, Foto de destaque do profissional à direita com elementos gráficos/orgânicos ao fundo). Empilhado no Mobile.
*   **Elementos:**
    *   **Badge/Selo Superior:** Nome do Profissional + Especialidade + Registro Profissional (ex: `CRO/CRM 0000`).
    *   **Headline (H1):** Frase emocional e direta focada no benefício (ex: *"Cuidamos do sorriso de quem você mais ama!"*).
    *   **Subheadline:** Explicação rápida do público-alvo e do método de trabalho (ex: *"Atendimento para [público]. Acolhimento, paciência e técnicas para que se sintam tranquilos."*).
    *   **CTA Principal:** Botão de destaque (`Agendar Consulta` com ícone do WhatsApp).

---

### Seção 2: Especialidades / Serviços Principais
*   **Objetivo:** Apresentar o que é oferecido de forma escaneável, focando no *benefício* do procedimento e não apenas no termo técnico.
*   **Layout:** Grid de 2 a 4 colunas (Cards verticais).
*   **Elementos do Card:**
    *   Ícone ilustrativo ou foto do procedimento no topo.
    *   **Título do Serviço (H3):** Ex: *Ortodontia Infantil*, *Laserterapia*, *Reabilitação*.
    *   **Descrição Curta:** 3 a 4 linhas explicando como o procedimento traz conforto, segurança ou resultado prático para o paciente.

---

### Seção 3: Serviço "Estrela" (Destaque de Diferencial Técnico)
*   **Objetivo:** Destacar o serviço de maior valor agregado ou que resolve a maior dor do público (no site referência: *Sedação Consciente* para quem tem medo).
*   **Layout:** Seção de largura total com cor de fundo diferenciada (`--bg-secondary`), layout de 2 colunas (Imagem/Vídeo demonstrativo + Texto explicativo aprofundado).
*   **Elementos:**
    *   **Título de Destaque (H2):** Nome do procedimento diferencial.
    *   **Texto Explicativo (2 parágrafos):** Desmistifica o procedimento, explica como funciona (ex: *Óxido Nitroso*) e para quem é indicado.
    *   **CTA Específico:** Botão focado neste serviço (ex: `Agendar consulta com sedação`).

---

### Seção 4: Prova Visual / Galeria ("Sorrisos que já cuidamos")
*   **Objetivo:** Gerar conexão emocional e tangibilizar a experiência na clínica através de fotos reais de pacientes no ambiente.
*   **Layout:** Carrossel interativo (Swiper/Slider) ou Bento Grid / Mosaico de imagens com cantos arredondados (`border-radius: 16px`).
*   **Elementos:**
    *   **Título da Seção (H2):** Focado em resultados humanos (ex: *"Sorrisos que já cuidamos"*).
    *   **Grid/Slider de Fotos:** 8 a 12 fotos humanizadas (pacientes sorrindo, interação com o profissional).
    *   **CTA de Conversão:** Botão centralizado abaixo da galeria (`Quero essa experiência`).

---

### Seção 5: Nossos Diferenciais (Por que escolher?)
*   **Objetivo:** Quebrar objeções mostrando a estrutura e a filosofia de atendimento.
*   **Layout:** Grid de 3 a 5 cards horizontais ou verticais com ícones de destaque.
*   **Estrutura dos Tópicos (Exemplos adaptáveis):**
    1.  **Atendimento Acolhedor:** Foco na empatia e respeito ao tempo do paciente.
    2.  **Atendimento Personalizado/Especial:** Adaptação à rotina e limites individuais.
    3.  **Experiência Sem Medo:** Uso de técnicas suaves para zero ansiedade.
    4.  **Tecnologia:** Equipamentos modernos para rapidez e precisão.
    5.  **Ambiente:** Espaço físico preparado, lúdico ou confortável.

---

### Seção 6: Sobre o Profissional (Autoridade e Bio)
*   **Objetivo:** Gerar credibilidade técnica (currículo) combinada com empatia pessoal.
*   **Layout:** 2 colunas (Foto profissional em retrato elegante de um lado + Texto biográfico estruturado do outro).
*   **Estrutura do Texto (Storytelling em 4 parágrafos):**
    *   *Parágrafo 1:* Tempo de formação, especializações e títulos acadêmicos.
    *   *Parágrafo 2:* Paixão pela área e filosofia de cuidado desde o início da carreira.
    *   *Parágrafo 3:* Habilitações específicas que resolvem dores do público.
    *   *Parágrafo 4:* Resumo da atuação atual unindo técnica, acolhimento e tecnologia.
*   **CTA:** Botão (`Quero agendar uma consulta`).

---

### Seção 7: Prova Social (Depoimentos)
*   **Objetivo:** Validação por terceiros (Avaliações do Google / Mensagens de pacientes).
*   **Layout:** Carrossel de Cards de Depoimento.
*   **Elementos:**
    *   Estrelas de avaliação (5 estrelas em amarelo/dourado).
    *   Texto do relato do paciente (ou pais do paciente).
    *   Nome do paciente / foto.
    *   **CTA Pós-Prova Social:** Botão (`Agendar minha consulta`).

---

### Seção 8: FAQ (Respondendo Suas Perguntas)
*   **Objetivo:** Eliminar dúvidas frequentes antes do clique no WhatsApp, qualificando o lead.
*   **Layout:** Componente de Acordeão (Accordion) centralizado (largura máxima de `800px`).
*   **Perguntas-Chave (Estrutura):**
    1.  *Idade/Momento ideal para iniciar o acompanhamento?*
    2.  *Como vocês lidam com a principal objeção (medo/dor/tempo)?*
    3.  *O método diferencial é seguro?*
    4.  *Para quem é indicado o serviço específico?*
    5.  *Abrangência de público (ex: "Vocês também atendem adultos?").*
*   **CTA:** Botão abaixo do acordeão (`Agendar minha consulta`).

---

### Seção 9: Rodapé e Contato (Footer + Localização)
*   **Objetivo:** Fornecer dados de localização física, canais de contato direto e links para redes sociais.
*   **Layout:** 2 ou 3 colunas no topo do rodapé + Mapa incorporado (Google Maps iframe) + Barra de Copyright na base.
*   **Elementos:**
    *   **Telefones:** WhatsApp e Fixo clicáveis.
    *   **E-mail:** Endereço de contato.
    *   **Endereço Físico Completo:** Nome do empresarial, avenida, torre, sala, bairro, cidade e CEP.
    *   **Redes Sociais:** Ícones com link para Instagram e YouTube.
    *   **Copyright:** `© Copyright [Ano] | [Nome do Profissional] – Todos os direitos reservados.`

---

## 3. Padrões de Conversão e UX (Boas Práticas Aplicadas)

1.  **Repetição Estratégica de CTAs:** Quase todas as seções terminam com um botão de ação. O texto do botão varia sutilmente conforme o contexto da seção (*"Agendar consulta"*, *"Quero essa experiência"*, *"Agendar consulta com sedação"*), mas todos levam ao mesmo canal de conversão (link direto para o WhatsApp com mensagem personalizada).
2.  **Botão Flutuante de WhatsApp:** Presença constante no canto inferior direito da tela durante toda a rolagem.
3.  **Linguagem Positiva:** O copywriting evita palavras associadas a trauma ou dor, substituindo-as por termos como *"tranquilo"*, *"seguro"*, *"confortável"*, *"leve"* e *"acolhedor"*.
4.  **Mobile-First:** Como a maior parte do tráfego vem do Instagram e buscas locais no celular, os cards devem empilhar em coluna única no mobile com espaçamento vertical (`gap`) de pelo menos `16px` a `24px`, e botões ocupando `100%` da largura em telas pequenas.