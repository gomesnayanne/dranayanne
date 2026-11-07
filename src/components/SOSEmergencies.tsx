import React, { useState } from 'react';
import { AlertOctagon, HeartCrack, ShieldAlert, Sparkles, PhoneCall, HelpCircle, Activity, Stethoscope } from 'lucide-react';

interface EmergencyTopic {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  shortDesc: string;
  conductSteps: string[];
  alertNotice?: string;
  prescriptionTip?: string;
}

const EMERGENCY_GUIDELINES: EmergencyTopic[] = [
  {
    id: 'mordedura-labio',
    title: 'Mordedura de Lábio / Bochecha Pós-Anestesia',
    badge: 'Muito Frequente',
    badgeColor: 'bg-[#FED7AA] text-[#9A3412]',
    shortDesc: 'Trauma autoinfligido quando a criança morde lábio, mucosa jugal ou língua ainda sob efeito anestésico residual.',
    conductSteps: [
      'Tranquilizar a família: a ferida forma uma placa esbranquiçada/amarelada que se assemelha a pus, mas é fibrina cicatricial normal.',
      'Primeiras 24 horas: Aplicar compressas geladas locais para diminuir edema.',
      'Lubrificação & Proteção: Prescrever pomada cicatrizante oral (ex: Dexpantenol ou pomada protetora) 3 a 4x ao dia.',
      'Analgesia: Paracetamol ou Dipirona em gotas conforme o peso da criança nas primeiras 48h se dor.',
      'Orientação preventiva futura: Em próximas consultas, colocar rolinho de algodão no fundo de sulco e reforçar com os pais vigilância contínua até o anestésico passar por completo.'
    ],
    alertNotice: 'Não desbridar nem tentar remover a fibrina esbranquiçada, pois isso reinicia o sangramento e atrasa a epitelização.',
    prescriptionTip: 'Pomada protetora de barreira oral + Paracetamol 10-15 mg/kg se desconforto.'
  },
  {
    id: 'avulsao-dentaria',
    title: 'Traumatismo & Avulsão Dentária Infantil',
    badge: 'Emergência Aguda',
    badgeColor: 'bg-[#FECDD3] text-[#9F1239]',
    shortDesc: 'Conduta imediata frente à perda acidental do dente após queda ou impacto.',
    conductSteps: [
      'DENTE DECÍDUO (DE LEITE): NUNCA REIMPLANTAR! O reimplante de dente decíduo pode levar à anquilose, infecção e necrose que danifica irreversivelmente o germe do sucessor permanente.',
      'DENTE PERMANENTE: Reimplante IMEDIATO é o tratamento de escolha.',
      'Como manusear o dente permanente: Segurar apenas pela coroa (NUNCA na raiz!). Lavar delicadamente em água corrente por 10 segundos se estiver sujo.',
      'Meio de transporte se não for possível o reimplante imediato: Leite integral frio, soro fisiológico ou na própria saliva (copinho). NUNCA em guardanapo seco.',
      'Janela de Ouro: Buscar atendimento do cirurgião-dentista em até 60 minutos para contenção semirrígida.'
    ],
    alertNotice: 'Certificar-se de que a criança não aspirou o dente ou fragmentos (se tosse persistente ou dispneia, encaminhar para raio-X torácico hospitalar).'
  },
  {
    id: 'toxicidade-anestesico',
    title: 'Intoxicação por Anestésico Local (LAST)',
    badge: 'Gravidade Máxima',
    badgeColor: 'bg-[#FEF2F2] text-[#991B1B]',
    shortDesc: 'Reação adversa sistêmica decorrente de injeção intravascular inadvertida ou superdosagem em pacientes de baixo peso.',
    conductSteps: [
      'Sinais Iniciais (SNC): Gosto metálico, formigamento perioral, zumbido, olhar fixo, fala arrastada, agitação, tremores.',
      'Sinais Avançados: Convulsões tônico-clônicas, perda da consciência, depressão respiratória, bradicardia e colapso cardiovascular.',
      'CONDUTA IMEDIATA:',
      '1. INTERROMPER A INJEÇÃO IMEDIATAMENTE e retirar qualquer material da boca.',
      '2. Chamar ajuda imediatamente (SAMU 192 ou emergência local).',
      '3. Manter vias aéreas pérvias e ventilação com oxigênio a 100%.',
      '4. Colocar a criança em decúbito dorsal (posição supina com pernas levemente elevadas se hipotensão).',
      '5. Monitorar pulso e respiração continuamente até a chegada da equipe médica avançada.'
    ],
    alertNotice: 'Prevenção é a melhor arma: sempre aspire antes de injetar, respeite a dose máxima de tubetes por peso e injete lentamente (no mínimo 60 segundos por tubete).'
  },
  {
    id: 'hemorragia-pos-exodontia',
    title: 'Hemorragia Pós-Exodontia Decídua',
    badge: 'Conduta Clínica',
    badgeColor: 'bg-[#DDD6FE] text-[#5B21B6]',
    shortDesc: 'Sangramento persistente ou profuso após extração dentária decídua.',
    conductSteps: [
      'Compressão mecânica direta: Colocar gaze estéril dobrada sobre o alvéolo e pedir à criança para morder firmemente por 15 a 20 minutos ininterruptos.',
      'Se refratário: Aplicar esponja hemostática de colágeno (ex: Hemospon) no interior do alvéolo e realizar sutura simples com fio absorvível ou seda 4-0.',
      'Adjuvante tópico: Embeber a gaze em solução de Ácido Tranexâmico (Transamin) e manter sob mordida por 15 minutos.',
      'Instruções pós-operatórias aos pais: Não permitir bochechos, não tomar líquidos em canudinho (vácuo rompe o coágulo), alimentos frios/pastosos.'
    ],
    alertNotice: 'Investigar histórico familiar de coagulopatias (Doença de von Willebrand, Hemofilia) se sangramento sem causa local aparente.'
  },
  {
    id: 'reacao-anafilaxia',
    title: 'Reação Alérgica Aguda & Anafilaxia',
    badge: 'Urgência Médica',
    badgeColor: 'bg-[#FEE2E2] text-[#B91C1C]',
    shortDesc: 'Reação de hipersensibilidade tipo I a medicamentos (antibióticos, AINEs) ou látex.',
    conductSteps: [
      'Reação Leve (Urticária, prurido cutâneo sem falta de ar): Administrar anti-histamínico oral (ex: Dexclorfeniramina / Polaramine gotas) e manter em observação.',
      'ANAFILAXIA (Estridor, broncoespasmo, edema de glote, hipotensão):',
      '1. Acionar SAMU (192) IMEDIATAMENTE.',
      '2. Primeira Linha: ADRENALINA (Epinefrina 1:1000) por via INTRAMUSCULAR na face anterolateral da coxa.',
      'Dose Pediátrica de Adrenalina: 0,01 mg/kg (ou 0,01 mL/kg da solução 1:1000). Máx: 0,15 mg para < 25 kg e 0,3 mg para > 25 kg.',
      '3. Manter vias aéreas pérvias, administrar oxigênio e posicionar a criança deitada com pernas elevadas.'
    ],
    alertNotice: 'Nunca use anti-histamínicos ou corticoides como substitutos da adrenalina na anafilaxia aguda. Adrenalina IM precoce salva vidas!'
  }
];

export const SOSEmergencies: React.FC = () => {
  const [activeEmergencyId, setActiveEmergencyId] = useState<string>(EMERGENCY_GUIDELINES[0].id);

  const selectedTopic = EMERGENCY_GUIDELINES.find((t) => t.id === activeEmergencyId) || EMERGENCY_GUIDELINES[0];

  return (
    <div className="bg-white border-3 border-[#18181B] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#18181B] mb-5">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#18181B]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#FDA4AF] border-2 border-[#18181B] flex items-center justify-center shadow-[2px_2px_0px_#18181B]">
            <AlertOctagon className="w-5 h-5 text-[#9F1239]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#18181B] uppercase tracking-tight">
              SOS & Condutas de Emergência
            </h2>
            <p className="text-[11px] font-semibold text-[#52525B]">
              Protocolos clínicos rápidos para consultório odontopediátrico
            </p>
          </div>
        </div>

        <a
          href="tel:192"
          className="px-3 py-1.5 bg-[#EF4444] text-white border-2 border-[#18181B] rounded-xl font-black text-xs flex items-center gap-1 shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5"
          title="Ligar SAMU 192"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>SAMU 192</span>
        </a>
      </div>

      {/* Emergency selector tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
        {EMERGENCY_GUIDELINES.map((item) => {
          const isSelected = item.id === activeEmergencyId;
          return (
            <button
              key={item.id}
              onClick={() => setActiveEmergencyId(item.id)}
              className={`p-2.5 rounded-xl text-left border-2 transition-all relative ${
                isSelected
                  ? 'bg-[#18181B] text-white border-[#18181B] shadow-[2.5px_2.5px_0px_#FFE500]'
                  : 'bg-[#F8F5EE] hover:bg-slate-100 text-[#18181B] border-[#18181B]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded border ${
                    isSelected ? 'bg-white text-black border-black' : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              </div>
              <div className="text-xs font-black leading-tight line-clamp-2">
                {item.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Guideline Details */}
      <div className="bg-[#FFFBEB] border-2.5 border-[#18181B] rounded-2xl p-4 sm:p-5 shadow-[3px_3px_0px_#18181B]">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="bg-[#18181B] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
              Protocolo Imediato
            </span>
            <h3 className="text-base sm:text-lg font-black text-[#18181B]">
              {selectedTopic.title}
            </h3>
          </div>
          <p className="text-xs text-[#52525B] font-semibold leading-relaxed">
            {selectedTopic.shortDesc}
          </p>
        </div>

        {/* Action Steps */}
        <div className="bg-white border-2 border-[#18181B] rounded-xl p-3.5 mb-3 shadow-[2px_2px_0px_#18181B]">
          <h4 className="text-xs font-black text-[#18181B] uppercase mb-2 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#2563EB]" />
            Passo a Passo da Conduta Clínica:
          </h4>
          <ol className="space-y-2 text-xs text-[#334155] font-medium list-decimal pl-4 leading-relaxed">
            {selectedTopic.conductSteps.map((step, idx) => (
              <li key={idx} className="pl-1">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Alert Notice */}
        {selectedTopic.alertNotice && (
          <div className="bg-[#FEF2F2] border-2 border-[#DC2626] rounded-xl p-3 text-xs text-[#991B1B] font-bold flex items-start gap-2 shadow-[1px_1px_0px_#DC2626]">
            <ShieldAlert className="w-4 h-4 shrink-0 text-[#DC2626] mt-0.5" />
            <div>
              <strong>Atenção Crucial:</strong> {selectedTopic.alertNotice}
            </div>
          </div>
        )}

        {/* Prescription Tip */}
        {selectedTopic.prescriptionTip && (
          <div className="mt-2.5 bg-[#F0FDF4] border border-[#16A34A] rounded-xl p-2.5 text-xs text-[#166534] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span>
              <strong>Dica Posológica:</strong> {selectedTopic.prescriptionTip}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
