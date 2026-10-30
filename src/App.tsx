import React, { useMemo, useState } from "react";;

/* ====================== ÍCONOS SVG NATIVOS (sin dependencias) ====================== */

const crearIcono = (trazos) => {
  const Icono = ({ size = 24, className = "", ...rest }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {trazos}
    </svg>
  );
  return Icono;
};

const Menu = crearIcono(<>
  <line x1="4" x2="20" y1="6" y2="6" />
  <line x1="4" x2="20" y1="12" y2="12" />
  <line x1="4" x2="20" y1="18" y2="18" />
</>);
const X = crearIcono(<>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</>);
const GraduationCap = crearIcono(<>
  <path d="M22 10 12 5 2 10l10 5 10-5z" />
  <path d="M6 12v5c3 3 9 3 12 0v-5" />
</>);
const Scale = crearIcono(<>
  <path d="M12 3v18" />
  <path d="M5 7h14" />
  <path d="m5 7-3 7h6z" />
  <path d="m19 7-3 7h6z" />
</>);
const Plus = crearIcono(<>
  <path d="M12 5v14" />
  <path d="M5 12h14" />
</>);
const Copy = crearIcono(<>
  <rect width="14" height="14" x="8" y="8" rx="2" />
  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
</>);
const Check = crearIcono(<path d="M20 6 9 17l-5-5" />);
const Calendar = crearIcono(<>
  <rect width="18" height="18" x="3" y="4" rx="2" />
  <path d="M16 2v4" />
  <path d="M8 2v4" />
  <path d="M3 10h18" />
</>);
const Clock = crearIcono(<>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 6v6l4 2" />
</>);
const Building2 = crearIcono(<>
  <rect width="16" height="20" x="4" y="2" rx="2" />
  <path d="M9 22v-4h6v4" />
  <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
</>);
const ArrowRight = crearIcono(<>
  <path d="M5 12h14" />
  <path d="m12 5 7 7-7 7" />
</>);
const ArrowLeft = crearIcono(<>
  <path d="m12 19-7-7 7-7" />
  <path d="M19 12H5" />
</>);
const Sparkles = crearIcono(<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />);
const ShieldCheck = crearIcono(<>
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  <path d="m9 12 2 2 4-4" />
</>);
const LinkIcon = crearIcono(<>
  <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
  <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
</>);
const ChevronDown = crearIcono(<path d="m6 9 6 6 6-6" />);

/* ============================ DATOS BASE ============================ */

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie"];
const TURNOS = [
  { id: "Mañana", horario: "08:00–12:00" },
  { id: "Tarde", horario: "12:00–18:00" },
  { id: "Noche", horario: "18:00–22:00" },
];
const k = (t, d) => `${t}-${d}`;

// Bloques ocupados por cursada (no editables en la matriz del estudiante)
const CURSADA_BASE = {
  [k("Mañana", "Lun")]: "Análisis II",
  [k("Mañana", "Mar")]: "Bases de Datos",
  [k("Mañana", "Jue")]: "Análisis II",
  [k("Tarde", "Mié")]: "Laboratorio IV",
  [k("Noche", "Lun")]: "Programación III",
  [k("Noche", "Jue")]: "Ingeniería de Software",
};

const MATRIZ_INICIAL = Object.fromEntries(
  TURNOS.flatMap((t) =>
    DIAS.map((d) => [k(t.id, d), CURSADA_BASE[k(t.id, d)] ? "CURSADA" : "LIBRE"])
  )
);

const PROYECTOS_INICIALES = [
  {
    id: 1,
    titulo: "Sistema de turnos para clínica barrial",
    materia: "Ingeniería de Software",
    descripcion: "App web para gestionar turnos con roles de paciente, recepción y profesional.",
    rol: "Líder técnico y backend",
    link: "https://github.com/",
    tecnologias: ["Python", "Django", "PostgreSQL"],
  },
  {
    id: 2,
    titulo: "Análisis de consumo eléctrico residencial",
    materia: "Análisis II",
    descripcion: "Procesamiento de datasets horarios y modelos de regresión para detectar patrones.",
    rol: "Analista de datos",
    link: "https://github.com/",
    tecnologias: ["Pandas", "Scikit-learn", "Jupyter"],
  },
];

const VACANTES_INICIALES = [
  {
    id: 1,
    titulo: "Pasante de Marketing Digital",
    empresa: "Grupo Río Norte S.A.",
    tipo: "Pasantía Ley 26.427",
    jornada: "20 hs semanales",
    requeridos: [k("Tarde", "Lun"), k("Tarde", "Mar"), k("Tarde", "Vie"), k("Noche", "Mar"), k("Noche", "Mié"), k("Mañana", "Vie")],
    habilidades: ["Google Analytics", "Redes sociales", "Canva"],
  },
  {
    id: 2,
    titulo: "Analista de Datos Part-time",
    empresa: "TechPyme SRL",
    tipo: "Part-time (LCT)",
    jornada: "24 hs semanales",
    requeridos: [k("Mañana", "Mié"), k("Mañana", "Vie"), k("Tarde", "Lun"), k("Tarde", "Mar")],
    habilidades: ["Python", "SQL", "Power BI"],
  },
  {
    id: 3,
    titulo: "Desarrollador Frontend Flex",
    empresa: "Estudio Delta",
    tipo: "Proyecto Flex",
    jornada: "Por entregables",
    requeridos: [k("Noche", "Mar"), k("Noche", "Mié"), k("Noche", "Vie")],
    habilidades: ["React", "Tailwind CSS", "Figma"],
  },
];

const CANDIDATOS_INICIALES = [
  { id: 101, busquedaId: 1, nombre: "Sofía Benítez", iniciales: "SB", carrera: "Lic. en Administración · UBA", avance: 71, compat: 100, turno: "Turno Noche Libre", columna: "entrevista", entrevista: "2026-10-27 · 18:30", proyectos: [{ titulo: "Plan de marketing para cafetería", materia: "Marketing I", rol: "Estratega", nota: "9/10" }], habilidades: ["SEO", "Excel", "HubSpot"] },
  { id: 102, busquedaId: 1, nombre: "Mateo Quiroga", iniciales: "MQ", carrera: "Lic. en Comunicación · UNLP", avance: 48, compat: 80, turno: "Mañana y Tarde parcial", columna: "postulados", entrevista: null, proyectos: [{ titulo: "Campaña para ONG local", materia: "Comunicación Digital", rol: "Copywriter", nota: "8/10" }], habilidades: ["Copywriting", "Meta Ads", "Video"] },
  { id: 103, busquedaId: 1, nombre: "Lucía Fernández", iniciales: "LF", carrera: "Ing. en Informática · UBA", avance: 62, compat: 100, turno: "Turno Tarde Libre", columna: "compatibles", entrevista: null, proyectos: PROYECTOS_INICIALES.map((p) => ({ titulo: p.titulo, materia: p.materia, rol: p.rol, nota: "9/10" })), habilidades: ["Google Analytics", "Canva", "Python"] },
  { id: 104, busquedaId: 1, nombre: "Valentina Ruiz", iniciales: "VR", carrera: "Contador Público · UBA", avance: 90, compat: 100, turno: "Turno Tarde Libre", columna: "contratado", entrevista: null, proyectos: [{ titulo: "Auditoría de e-commerce", materia: "Auditoría", rol: "Analista", nota: "10/10" }], habilidades: ["Google Ads", "Excel", "Analítica web"] },
  { id: 105, busquedaId: 2, nombre: "Joaquín Molina", iniciales: "JM", carrera: "Ing. Industrial · UTN", avance: 55, compat: 100, turno: "Turno Mañana Libre", columna: "compatibles", entrevista: null, proyectos: [{ titulo: "Dashboard de producción", materia: "Estadística", rol: "Analista", nota: "8/10" }], habilidades: ["SQL", "Python", "Excel"] },
  { id: 106, busquedaId: 2, nombre: "Tomás Ibarra", iniciales: "TI", carrera: "Lic. en Marketing · UCA", avance: 85, compat: 60, turno: "Solo Noche libre", columna: "postulados", entrevista: null, proyectos: [{ titulo: "Modelo de atribución", materia: "Analítica", rol: "Analista", nota: "9/10" }], habilidades: ["Power BI", "SQL", "Figma"] },
];

const COLUMNAS = [
  { id: "postulados", titulo: "Postulados", color: "bg-slate-400" },
  { id: "compatibles", titulo: "Compatibles por Horario", color: "bg-emerald-400" },
  { id: "entrevista", titulo: "En Entrevista", color: "bg-indigo-400" },
  { id: "contratado", titulo: "Contratado", color: "bg-violet-400" },
];

const VISTAS = [
  { id: "landing", label: "Inicio", icon: Sparkles },
  { id: "estudiante", label: "Portal Estudiante", icon: GraduationCap },
  { id: "empresa", label: "Panel Empresa", icon: Building2 },
  { id: "legales", label: "Legales y Calculadora", icon: Scale },
];

/* ============================== UTILIDADES ============================== */

const calcCompat = (requeridos, matriz) => {
  if (!requeridos.length) return 0;
  const libres = requeridos.filter((key) => matriz[key] === "LIBRE").length;
  return Math.round((libres / requeridos.length) * 100);
};

const pesos = (n) => `$ ${Math.round(n).toLocaleString("es-AR")}`;

const badgeCompat = (p) =>
  p >= 90 ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30"
  : p >= 70 ? "bg-amber-500/15 text-amber-300 ring-amber-500/30"
  : "bg-rose-500/15 text-rose-300 ring-rose-500/30";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20 ${className}`}>{children}</div>
);

const Boton = ({ children, variante = "primario", className = "", ...rest }) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-40";
  const estilos = {
    primario: "bg-indigo-500 text-white hover:bg-indigo-400",
    esmeralda: "bg-emerald-500 text-slate-950 hover:bg-emerald-400",
    fantasma: "bg-slate-800 text-slate-200 hover:bg-slate-700",
  };
  return <button type="button" className={`${base} ${estilos[variante]} ${className}`} {...rest}>{children}</button>;
};

const Input = (props) => (
  <input
    {...props}
    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
  />
);

const Modal = ({ titulo, onCerrar, children, ancho = "max-w-lg" }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm" onClick={onCerrar}>
    <div role="dialog" aria-modal="true" className={`w-full ${ancho} max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl`} onClick={(e) => e.stopPropagation()}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">{titulo}</h3>
        <button type="button" onClick={onCerrar} aria-label="Cerrar" className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white">
          <X size={18} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

/* ================================ VISTAS ================================ */

/* ---- 1. Landing ---- */

function VistaLanding({ onIr, onPostular, postuladas, matriz, vacantes }) {
  const [calc, setCalc] = useState({ salario: 1200000, consultoraPct: 25, contrataciones: 3, feeMatch: 180000 });
  const set = (campo) => (e) => setCalc({ ...calc, [campo]: Number(e.target.value) || 0 });

  const resultado = useMemo(() => {
    const tradicional = calc.salario * 12 * (calc.consultoraPct / 100) * calc.contrataciones;
    const payPerMatch = calc.feeMatch * calc.contrataciones;
    return { tradicional, payPerMatch, ahorro: tradicional - payPerMatch };
  }, [calc]);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
            <ShieldCheck size={14} /> Talento universitario verificado
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Conectamos talento universitario verificado con <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">PyMEs en crecimiento</span>
          </h1>
          <p className="mt-5 max-w-xl text-slate-400">
            Matcheamos por horario real de cursada, validamos proyectos académicos y contratamos bajo el encuadre legal correcto: pasantía, part-time o proyecto flex.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Boton onClick={() => onIr("estudiante")}>Soy estudiante <ArrowRight size={16} /></Boton>
            <Boton variante="fantasma" onClick={() => onIr("empresa")}>Soy empresa</Boton>
          </div>
        </div>

        {/* Tarjeta demo */}
        <Card className="relative">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white">LF</div>
            <div>
              <p className="font-semibold text-white">Lucía Fernández</p>
              <p className="text-xs text-slate-400">Ing. en Informática · UBA · 62% de avance</p>
            </div>
          </div>
          <div className="mt-6 rounded-xl bg-slate-950 p-4">
            <div className="mb-2 flex justify-between text-xs text-slate-400">
              <span>Compatibilidad horaria</span>
              <span className="font-bold text-emerald-400">100% Match</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700" />
            </div>
            <p className="mt-3 text-sm text-slate-300">Compatible con <span className="font-semibold">Pasante de Marketing Digital</span> · Turno Tarde libre</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {["Python", "Django", "React"].map((t) => (
              <span key={t} className="rounded-md bg-indigo-500/10 px-2 py-1 text-indigo-300 ring-1 ring-indigo-500/20">{t}</span>
            ))}
            <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-300 ring-1 ring-emerald-500/20">✔ Proyecto validado</span>
          </div>
        </Card>
      </section>

      {/* Modalidades */}
      <section>
        <h2 className="text-2xl font-bold text-white">Modalidades de contratación</h2>
        <p className="mt-1 text-slate-400">Elegí el encuadre que corresponde a cada necesidad.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            { t: "Pasantías (Ley 26.427)", d: "Para estudiantes de carreras terciarias y universitarias. Relación educativa, no laboral, con estímulo económico y ART.", c: "text-indigo-300" },
            { t: "Part-Time (LCT)", d: "Relación de dependencia regulada por la Ley de Contrato de Trabajo, con aportes y cargas patronales completas.", c: "text-emerald-300" },
            { t: "Proyectos Flex", d: "Pago por entregable o proyecto puntual, ideal para PyMEs con demanda variable.", c: "text-violet-300" },
          ].map((m) => (
            <Card key={m.t}>
              <h3 className={`font-bold ${m.c}`}>{m.t}</h3>
              <p className="mt-2 text-sm text-slate-400">{m.d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Calculadora */}
      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-white">¿Cuánto ahorra tu PyME?</h2>
          <p className="mt-1 text-slate-400">Comparamos consultoras tradicionales de RRHH contra nuestro modelo Pay-per-Match.</p>
          <Card className="mt-6 space-y-4">
            <label className="block text-sm text-slate-300">Salario bruto mensual de referencia (ARS)
              <Input type="number" value={calc.salario} onChange={set("salario")} className="mt-1" />
            </label>
            <label className="block text-sm text-slate-300">Honorario de consultora (% del salario anual)
              <Input type="number" value={calc.consultoraPct} onChange={set("consultoraPct")} className="mt-1" />
            </label>
            <label className="block text-sm text-slate-300">Cantidad de contrataciones
              <Input type="number" value={calc.contrataciones} onChange={set("contrataciones")} className="mt-1" />
            </label>
            <label className="block text-sm text-slate-300">Fee por match UniMatch (ARS)
              <Input type="number" value={calc.feeMatch} onChange={set("feeMatch")} className="mt-1" />
            </label>
          </Card>
        </div>
        <Card className="flex flex-col justify-center gap-5">
          <div className="rounded-xl bg-slate-950 p-4">
            <p className="text-xs text-slate-400">Consultora tradicional</p>
            <p className="text-2xl font-bold text-rose-300">{pesos(resultado.tradicional)}</p>
          </div>
          <div className="rounded-xl bg-slate-950 p-4">
            <p className="text-xs text-slate-400">Pay-per-Match UniMatch</p>
            <p className="text-2xl font-bold text-emerald-300">{pesos(resultado.payPerMatch)}</p>
          </div>
          <div className="rounded-xl bg-emerald-500/10 p-4 ring-1 ring-emerald-500/30">
            <p className="text-xs text-emerald-200">Ahorro estimado</p>
            <p className="text-3xl font-extrabold text-emerald-300">{pesos(Math.max(resultado.ahorro, 0))}</p>
          </div>
          <p className="text-xs text-slate-500">Cálculo orientativo. Los valores son editables y no constituyen una cotización.</p>
        </Card>
      </section>

      {/* Vacantes en vivo */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-white">Vacantes destacadas en vivo</h2>
            <p className="mt-1 text-slate-400">Postulate con un clic desde tu portal de estudiante.</p>
          </div>
          <Boton variante="fantasma" onClick={() => onIr("estudiante")}>Ver mis compatibilidades</Boton>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {vacantes.map((v) => {
            const pct = calcCompat(v.requeridos, matriz);
            const postulada = postuladas.includes(v.id);
            return (
              <Card key={v.id} className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wide text-indigo-300">{v.tipo}</span>
                <h3 className="mt-2 font-bold text-white">{v.titulo}</h3>
                <p className="text-sm text-slate-400">{v.empresa} · {v.jornada}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {v.habilidades.map((h) => (
                    <span key={h} className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-300">{h}</span>
                  ))}
                </div>
                <div className="mt-auto pt-5">
                  <p className="mb-3 text-xs text-slate-400">Tu compatibilidad: <span className={`rounded-md px-1.5 py-0.5 font-bold ring-1 ${badgeCompat(pct)}`}>{pct}%</span></p>
                  <Boton variante={postulada ? "fantasma" : "esmeralda"} className="w-full" disabled={postulada} onClick={() => onPostular(v.id)}>
                    {postulada ? <><Check size={16} /> Postulado</> : "Postularme"}
                  </Boton>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* ---- 2. Portal Estudiante ---- */

function ModalNuevoProyecto({ onGuardar, onCerrar }) {
  const [form, setForm] = useState({ titulo: "", materia: "", descripcion: "", rol: "", link: "", tecnologias: "" });
  const valido = form.titulo.trim() && form.materia.trim() && form.rol.trim();
  const set = (c) => (e) => setForm({ ...form, [c]: e.target.value });

  return (
    <Modal titulo="Agregar nuevo proyecto" onCerrar={onCerrar}>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!valido) return;
          onGuardar({
            ...form,
            tecnologias: form.tecnologias.split(",").map((t) => t.trim()).filter(Boolean),
          });
        }}
      >
        <label className="block text-sm text-slate-300">Título *<Input value={form.titulo} onChange={set("titulo")} className="mt-1" /></label>
        <label className="block text-sm text-slate-300">Materia *<Input value={form.materia} onChange={set("materia")} className="mt-1" /></label>
        <label className="block text-sm text-slate-300">Descripción
          <textarea rows={3} value={form.descripcion} onChange={set("descripcion")} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none" />
        </label>
        <label className="block text-sm text-slate-300">Rol del alumno *<Input value={form.rol} onChange={set("rol")} className="mt-1" /></label>
        <label className="block text-sm text-slate-300">Tecnologías (separadas por coma)<Input value={form.tecnologias} onChange={set("tecnologias")} placeholder="Python, Figma" className="mt-1" /></label>
        <label className="block text-sm text-slate-300">Enlace (repositorio o demo)<Input type="url" value={form.link} onChange={set("link")} placeholder="https://" className="mt-1" /></label>
        <div className="flex justify-end gap-2 pt-2">
          <Boton variante="fantasma" onClick={onCerrar}>Cancelar</Boton>
          <Boton type="submit" disabled={!valido}><Plus size={16} /> Guardar</Boton>
        </div>
      </form>
    </Modal>
  );
}

function VistaEstudiante({ matriz, onToggle, proyectos, onAgregarProyecto, postuladas, onPostular, vacantes }) {
  const [modalProyecto, setModalProyecto] = useState(false);

  const horasLibres = useMemo(() => Object.values(matriz).filter((v) => v === "LIBRE").length * 4, [matriz]);

  const recomendadas = useMemo(
    () => vacantes.map((v) => ({ ...v, pct: calcCompat(v.requeridos, matriz) })).sort((a, b) => b.pct - a.pct),
    [vacantes, matriz]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        {/* Header de perfil */}
        <Card className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-3xl font-extrabold text-white ring-4 ring-slate-800">LF</div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-500 px-2 py-0.5 text-[11px] font-bold text-slate-950">● Disponible</span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-white">Lucía Fernández</h1>
            <p className="text-slate-300">Ingeniería en Informática</p>
            <p className="text-sm text-slate-400">Universidad de Buenos Aires · 3.er año de cursada</p>
          </div>
          <div className="w-full sm:w-56">
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-slate-400">Avance de carrera</span>
              <span className="font-bold text-indigo-300">62%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800" role="progressbar" aria-valuenow={62} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700" style={{ width: "62%" }} />
            </div>
          </div>
        </Card>

        {/* Matriz */}
        <Card>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 font-bold text-white"><Clock size={18} className="text-emerald-400" /> Disponibilidad horaria semanal</h2>
              <p className="text-sm text-slate-400">Hacé clic en un bloque para alternar entre LIBRE y CURSADA.</p>
            </div>
            <div className="flex gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-emerald-500" />Libre</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-rose-500" />Cursada</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="grid min-w-[560px] grid-cols-[110px_repeat(5,1fr)] gap-2">
              <div />
              {DIAS.map((d) => <div key={d} className="text-center text-sm font-semibold text-slate-300">{d}</div>)}
              {TURNOS.map((t) => (
                <Fragmento key={t.id}>
                  <div className="flex flex-col justify-center">
                    <span className="text-sm font-semibold text-slate-200">{t.id}</span>
                    <span className="text-xs text-slate-500">{t.horario}</span>
                  </div>
                  {DIAS.map((d) => {
                    const key = k(t.id, d);
                    const estado = matriz[key];
                    const esCursada = estado === "CURSADA";
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => onToggle(key)}
                        aria-pressed={!esCursada}
                        title={CURSADA_BASE[key] ? `Cursada: ${CURSADA_BASE[key]}` : "Cambiar estado"}
                        className={`h-16 rounded-xl text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                          esCursada ? "bg-rose-500/20 text-rose-300 ring-1 ring-rose-500/40 hover:bg-rose-500/30" : "bg-emerald-500 text-slate-950 shadow-sm hover:bg-emerald-400"
                        }`}
                      >
                        {esCursada ? (CURSADA_BASE[key] ? CURSADA_BASE[key].split(" ")[0] : "CURSADA") : "LIBRE"}
                      </button>
                    );
                  })}
                </Fragmento>
              ))}
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between rounded-xl bg-indigo-500/10 px-4 py-3 text-sm text-indigo-200">
            <span>Disponibilidad declarada: <strong>{horasLibres} hs/semana</strong></span>
            <span className="text-xs text-indigo-300/70">Se actualiza en vivo</span>
          </div>
        </Card>

        {/* Proyectos */}
        <Card>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-white">Proyectos académicos y TP</h2>
              <p className="text-sm text-slate-400">{proyectos.length} proyectos cargados</p>
            </div>
            <Boton onClick={() => setModalProyecto(true)}><Plus size={16} /> Agregar proyecto</Boton>
          </div>
          <ul className="space-y-4">
            {proyectos.map((p) => (
              <li key={p.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-semibold text-white">{p.titulo}</h3>
                  <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">{p.materia}</span>
                </div>
                {p.descripcion && <p className="mt-2 text-sm text-slate-400">{p.descripcion}</p>}
                <p className="mt-3 text-sm text-slate-300"><span className="font-semibold text-slate-100">Rol:</span> {p.rol}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {p.tecnologias.map((t) => (
                    <span key={t} className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-300">{t}</span>
                  ))}
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:underline">
                      <LinkIcon size={12} /> Ver proyecto
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Vacantes recomendadas */}
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <h2 className="flex items-center gap-2 font-bold text-white"><Sparkles size={18} className="text-indigo-300" /> Vacantes recomendadas</h2>
        {recomendadas.map((v) => {
          const postulada = postuladas.includes(v.id);
          return (
            <Card key={v.id} className="!p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{v.titulo}</h3>
                  <p className="text-xs text-slate-400">{v.empresa} · {v.tipo}</p>
                </div>
                <span className={`shrink-0 rounded-md px-2 py-1 text-xs font-bold ring-1 ${badgeCompat(v.pct)}`}>{v.pct}%</span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-emerald-400 transition-all duration-500" style={{ width: `${v.pct}%` }} />
              </div>
              <Boton variante={postulada ? "fantasma" : "primario"} className="mt-4 w-full" disabled={postulada} onClick={() => onPostular(v.id)}>
                {postulada ? <><Check size={16} /> Postulado</> : "Postularme"}
              </Boton>
            </Card>
          );
        })}
      </aside>

      {modalProyecto && (
        <ModalNuevoProyecto
          onCerrar={() => setModalProyecto(false)}
          onGuardar={(p) => {
            onAgregarProyecto(p);
            setModalProyecto(false);
          }}
        />
      )}
    </div>
  );
}

// Fragmento corto para evitar importar React solo por el Fragment
function Fragmento({ children }) {
  return <>{children}</>;
}

/* ---- 3. Panel Empresa (ATS Kanban) ---- */

function ModalPublicar({ onGuardar, onCerrar }) {
  const [form, setForm] = useState({ titulo: "", tipo: "Pasantía Ley 26.427", jornada: "20 hs semanales" });
  const set = (c) => (e) => setForm({ ...form, [c]: e.target.value });
  return (
    <Modal titulo="Publicar nueva vacante" onCerrar={onCerrar}>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (form.titulo.trim()) onGuardar(form);
        }}
      >
        <label className="block text-sm text-slate-300">Título del puesto *<Input value={form.titulo} onChange={set("titulo")} placeholder="Ej: Pasante de Ventas" className="mt-1" /></label>
        <label className="block text-sm text-slate-300">Tipo de contratación
          <select value={form.tipo} onChange={set("tipo")} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100">
            <option>Pasantía Ley 26.427</option>
            <option>Part-time (LCT)</option>
            <option>Proyecto Flex</option>
          </select>
        </label>
        <label className="block text-sm text-slate-300">Jornada<Input value={form.jornada} onChange={set("jornada")} className="mt-1" /></label>
        <p className="text-xs text-slate-500">Por defecto la vacante requiere turnos de tarde (Lun a Vie). Podrás ajustarlo luego.</p>
        <div className="flex justify-end gap-2 pt-2">
          <Boton variante="fantasma" onClick={onCerrar}>Cancelar</Boton>
          <Boton type="submit" variante="esmeralda" disabled={!form.titulo.trim()}>Publicar</Boton>
        </div>
      </form>
    </Modal>
  );
}

function ModalVerPerfil({ c, onCerrar }) {
  return (
    <Modal titulo="Perfil del candidato" onCerrar={onCerrar} ancho="max-w-xl">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white">{c.iniciales}</div>
        <div>
          <p className="font-bold text-white">{c.nombre}</p>
          <p className="text-sm text-slate-400">{c.carrera}</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-950 p-3"><p className="text-xs text-slate-500">Avance de carrera</p><p className="font-bold text-white">{c.avance}%</p></div>
        <div className="rounded-xl bg-slate-950 p-3"><p className="text-xs text-slate-500">Compatibilidad horaria</p><p className="font-bold text-emerald-300">{c.compat}%</p></div>
        <div className="col-span-2 rounded-xl bg-slate-950 p-3"><p className="text-xs text-slate-500">Disponibilidad</p><p className="text-slate-200">{c.turno}</p></div>
      </div>
      <h4 className="mt-5 text-sm font-semibold text-slate-200">Proyectos académicos</h4>
      <ul className="mt-2 space-y-2">
        {c.proyectos.map((p, i) => (
          <li key={i} className="rounded-xl border border-slate-800 p-3 text-sm">
            <div className="flex justify-between gap-2">
              <span className="font-semibold text-white">{p.titulo}</span>
              <span className="text-xs font-bold text-amber-300">Nota {p.nota}</span>
            </div>
            <p className="text-xs text-slate-400">{p.materia} · Rol: {p.rol}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {c.habilidades.map((h) => <span key={h} className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-300">{h}</span>)}
      </div>
    </Modal>
  );
}

function ModalAgendar({ c, onConfirmar, onCerrar }) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const valido = fecha && hora;
  return (
    <Modal titulo="Agendar entrevista" onCerrar={onCerrar}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (valido) onConfirmar(`${fecha} · ${hora}`);
        }}
      >
        <p className="text-sm text-slate-400">Con <span className="text-white">{c.nombre}</span>. Al confirmar pasa a "En Entrevista".</p>
        <label className="block text-sm text-slate-300">Fecha<Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="mt-1" /></label>
        <label className="block text-sm text-slate-300">Horario<Input type="time" value={hora} onChange={(e) => setHora(e.target.value)} className="mt-1" /></label>
        <div className="flex justify-end gap-2">
          <Boton variante="fantasma" onClick={onCerrar}>Cancelar</Boton>
          <Boton type="submit" disabled={!valido}><Calendar size={16} /> Confirmar</Boton>
        </div>
      </form>
    </Modal>
  );
}

function VistaEmpresa({ vacantes, busquedaId, setBusquedaId, candidatos, setCandidatos, onPublicar }) {
  const [modalPublicar, setModalPublicar] = useState(false);
  const [verPerfil, setVerPerfil] = useState(null);
  const [agendarA, setAgendarA] = useState(null);

  const activa = vacantes.find((v) => v.id === busquedaId) ?? vacantes[0];

  const porColumna = useMemo(() => {
    const mapa = { postulados: [], compatibles: [], entrevista: [], contratado: [] };
    candidatos.filter((c) => c.busquedaId === activa.id).forEach((c) => mapa[c.columna].push(c));
    return mapa;
  }, [candidatos, activa.id]);

  const mover = (id, dir) =>
    setCandidatos((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const idx = COLUMNAS.findIndex((col) => col.id === c.columna);
        const nueva = COLUMNAS[idx + dir];
        return nueva ? { ...c, columna: nueva.id } : c;
      })
    );

  const confirmarEntrevista = (id, fecha) => {
    setCandidatos((prev) => prev.map((c) => (c.id === id ? { ...c, columna: "entrevista", entrevista: fecha } : c)));
    setAgendarA(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">{activa.empresa}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={activa.id}
                onChange={(e) => setBusquedaId(Number(e.target.value))}
                aria-label="Seleccionar búsqueda activa"
                className="appearance-none rounded-xl border border-slate-700 bg-slate-950 py-2 pl-3 pr-9 text-lg font-bold text-white focus:border-indigo-400 focus:outline-none"
              >
                {vacantes.map((v) => <option key={v.id} value={v.id}>{v.titulo}</option>)}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300 ring-1 ring-indigo-500/30">{activa.tipo}</span>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{activa.jornada}</span>
          </div>
        </div>
        <Boton variante="esmeralda" onClick={() => setModalPublicar(true)}><Plus size={16} /> Publicar nueva vacante</Boton>
      </Card>

      {/* Kanban */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNAS.map((col) => {
          const items = porColumna[col.id];
          return (
            <section key={col.id} className="flex min-h-[360px] flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                  <h2 className="text-sm font-bold text-slate-200">{col.titulo}</h2>
                </div>
                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs font-bold text-slate-300">{items.length}</span>
              </div>
              <div className="space-y-3">
                {items.length === 0 && (
                  <p className="rounded-xl border border-dashed border-slate-700 p-4 text-center text-xs text-slate-500">Sin candidatos</p>
                )}
                {items.map((c) => {
                  const idx = COLUMNAS.findIndex((x) => x.id === c.columna);
                  return (
                    <article key={c.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-md shadow-black/20 transition hover:border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">{c.iniciales}</div>
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-white">{c.nombre}</h3>
                          <p className="truncate text-xs text-slate-400">{c.carrera}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-slate-400">Avance</span>
                          <span className="font-bold text-indigo-300">{c.avance}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                          <div className="h-full rounded-full bg-indigo-400" style={{ width: `${c.avance}%` }} />
                        </div>
                      </div>
                      <span className={`mt-3 inline-block rounded-md px-2 py-1 text-xs font-bold ring-1 ${badgeCompat(c.compat)}`}>
                        {c.compat}% Compatible · {c.turno}
                      </span>
                      {c.entrevista && <p className="mt-2 text-xs text-indigo-300">📅 {c.entrevista}</p>}
                      <div className="mt-4 flex items-center gap-1.5 border-t border-slate-800 pt-3">
                        <button type="button" aria-label="Mover a la columna anterior" disabled={idx === 0} onClick={() => mover(c.id, -1)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30"><ArrowLeft size={14} /></button>
                        <button type="button" aria-label="Mover a la columna siguiente" disabled={idx === COLUMNAS.length - 1} onClick={() => mover(c.id, 1)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30"><ArrowRight size={14} /></button>
                        <button type="button" onClick={() => setVerPerfil(c)} className="flex-1 rounded-lg bg-slate-800 px-2 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700">Ver perfil</button>
                        <button type="button" onClick={() => setAgendarA(c)} className="flex-1 rounded-lg bg-indigo-500 px-2 py-1.5 text-xs font-semibold text-white hover:bg-indigo-400">Agendar</button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {modalPublicar && (
        <ModalPublicar
          onCerrar={() => setModalPublicar(false)}
          onGuardar={(datos) => {
            onPublicar(datos);
            setModalPublicar(false);
          }}
        />
      )}
      {verPerfil && <ModalVerPerfil c={verPerfil} onCerrar={() => setVerPerfil(null)} />}
      {agendarA && <ModalAgendar c={agendarA} onCerrar={() => setAgendarA(null)} onConfirmar={(f) => confirmarEntrevista(agendarA.id, f)} />}
    </div>
  );
}

/* ---- 4. Legales y Calculadora ---- */

const CONVENIO_TEXTO = `CONVENIO MARCO DE PASANTÍA EDUCATIVA
(Ley 26.427 – Sistema de Pasantías Educativas)

Entre {EMPRESA}, CUIT {CUIT_EMPRESA}, con domicilio en {DOMICILIO_EMPRESA} (en adelante, "LA EMPRESA"), por una parte; y {INSTITUCION}, con domicilio en {DOMICILIO_INSTITUCION} (en adelante, "LA INSTITUCIÓN EDUCATIVA"), por la otra; y {PASANTE}, DNI {DNI_PASANTE}, alumno/a de la carrera {CARRERA} (en adelante, "EL PASANTE"), se acuerda:

PRIMERA – OBJETO. El presente convenio tiene por objeto la realización de una pasantía educativa destinada a complementar la formación teórico-práctica de EL PASANTE, en el área de {AREA}, conforme al plan de actividades anexo.

SEGUNDA – DURACIÓN Y CARGA HORARIA. La pasantía tendrá una duración de {DURACION} meses, con una carga horaria máxima de {HORAS} horas semanales, en el turno {TURNO}, sin afectar el cursado regular de EL PASANTE.

TERCERA – ESTÍMULO ECONÓMICO. LA EMPRESA abonará a EL PASANTE un estímulo económico mensual de {MONTO} (pesos), en concepto de asignación estímulo, el cual no reviste carácter remuneratorio.

CUARTA – COBERTURA. LA EMPRESA contratará a favor de EL PASANTE una cobertura de Aseguradora de Riesgos del Trabajo (ART) y un seguro de accidentes personales, por todo el período de la pasantía.

QUINTA – TUTORÍA. LA EMPRESA designa como tutor/a a {TUTOR}, y LA INSTITUCIÓN EDUCATIVA designa como docente supervisor/a a {DOCENTE}.

SEXTA – EVALUACIÓN. Al finalizar, el tutor emitirá un informe de desempeño que será remitido a LA INSTITUCIÓN EDUCATIVA.

SÉPTIMA – RESCISIÓN. Cualquiera de las partes podrá rescindir el presente convenio con un preaviso de {PREAVISO} días, sin que ello genere indemnización alguna.

OCTAVA – JURISDICCIÓN. Para cualquier controversia, las partes se someten a la jurisdicción de los Tribunales Ordinarios de {JURISDICCION}.

Previa lectura, se firman dos ejemplares de un mismo tenor en la Ciudad de {CIUDAD}, a los {FECHA} días.

_____________________          _____________________          _____________________
LA EMPRESA                     LA INSTITUCIÓN                 EL PASANTE

Borrador orientativo. Debe ser revisado por asesoría legal antes de su firma.`;

function VistaLegales() {
  const [copiado, setCopiado] = useState(false);
  const [sueldo, setSueldo] = useState(1000000);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(CONVENIO_TEXTO);
    } catch {
      /* el navegador puede bloquear el portapapeles: se muestra igual la confirmación */
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // Cargas patronales de referencia para part-time bajo LCT (valores orientativos)
  const cargas = [
    { concepto: "Jubilación (SIPA)", pct: 10.17 },
    { concepto: "PAMI (INSSJP)", pct: 1.5 },
    { concepto: "Obra social", pct: 6 },
    { concepto: "Asignaciones familiares", pct: 7.5 },
    { concepto: "Fondo Nacional de Empleo", pct: 1.5 },
    { concepto: "ART (estimado)", pct: 2.5 },
  ];
  const totalPct = cargas.reduce((a, c) => a + c.pct, 0);
  const totalPesos = (sueldo * totalPct) / 100;
  const sac = sueldo / 12;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Convenio */}
      <Card className="flex flex-col">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-bold text-white"><Scale size={18} className="text-indigo-300" /> Convenio Marco de Pasantía</h2>
            <p className="text-sm text-slate-400">Ley 26.427 · Borrador con campos variables entre llaves</p>
          </div>
          <Boton variante={copiado ? "esmeralda" : "primario"} onClick={copiar}>
            {copiado ? <><Check size={16} /> Copiado</> : <><Copy size={16} /> Copiar</>}
          </Boton>
        </div>
        <textarea
          readOnly
          value={CONVENIO_TEXTO}
          rows={22}
          className="w-full flex-1 resize-y rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-300 focus:outline-none"
        />
        <p className="mt-3 text-xs text-slate-500">Reemplazá los campos entre llaves antes de firmar. Este texto no sustituye el asesoramiento legal.</p>
      </Card>

      {/* Desglose */}
      <div className="space-y-6">
        <Card>
          <h2 className="font-bold text-white">Pasantía (Ley 26.427)</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>• <strong>No es relación laboral:</strong> no genera cargas previsionales patronales como un empleo en relación de dependencia.</li>
            <li>• <strong>Asignación estímulo:</strong> monto mensual no remunerativo, definido en el convenio.</li>
            <li>• <strong>ART y seguro de accidentes personales:</strong> obligatorios para la empresa durante todo el período.</li>
            <li>• <strong>Carga horaria máxima</strong> y turnos acordados según el plan de actividades.</li>
          </ul>
        </Card>

        <Card>
          <h2 className="font-bold text-white">Part-time (LCT) · Cargas patronales</h2>
          <p className="mb-4 text-xs text-slate-500">Porcentajes de referencia; verificar alícuotas vigentes con contador.</p>
          <label className="mb-4 block text-sm text-slate-300">Sueldo bruto mensual (ARS)
            <Input type="number" value={sueldo} onChange={(e) => setSueldo(Number(e.target.value) || 0)} className="mt-1" />
          </label>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-800">
              {cargas.map((c) => (
                <tr key={c.concepto}>
                  <td className="py-2 text-slate-300">{c.concepto}</td>
                  <td className="py-2 text-right text-slate-400">{c.pct}%</td>
                  <td className="py-2 text-right font-medium text-slate-200">{pesos((sueldo * c.pct) / 100)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-950 p-3"><p className="text-xs text-slate-500">Total cargas ({totalPct.toFixed(2)}%)</p><p className="font-bold text-rose-300">{pesos(totalPesos)}</p></div>
            <div className="rounded-xl bg-slate-950 p-3"><p className="text-xs text-slate-500">Costo mensual total aprox.</p><p className="font-bold text-emerald-300">{pesos(sueldo + totalPesos)}</p></div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Provisión mensual de SAC (1/12): {pesos(sac)}. No incluye vacaciones ni indemnizaciones.</p>
        </Card>

        <Card>
          <h2 className="font-bold text-white">Asignación estímulo</h2>
          <p className="mt-2 text-sm text-slate-400">Es el pago mensual al pasante en concepto de estímulo. Se define en el convenio, no es salario y se paga sin cargas previsionales. Consultá la tabla vigente de tu jurisdicción.</p>
        </Card>
      </div>
    </div>
  );
}

/* ================================ APP ================================ */

export default function App() {
  const [vista, setVista] = useState("landing");
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Estado del estudiante
  const [matriz, setMatriz] = useState(MATRIZ_INICIAL);
  const [proyectos, setProyectos] = useState(PROYECTOS_INICIALES);
  const [postuladas, setPostuladas] = useState([]);

  // Estado de empresa
  const [vacantes, setVacantes] = useState(VACANTES_INICIALES);
  const [candidatos, setCandidatos] = useState(CANDIDATOS_INICIALES);
  const [busquedaId, setBusquedaId] = useState(VACANTES_INICIALES[0].id);

  const toggleBloque = (key) =>
    setMatriz((prev) => {
      if (prev[key] === "CURSADA" && CURSADA_BASE[key]) return prev; // bloque de cursada fijo
      return { ...prev, [key]: prev[key] === "LIBRE" ? "CURSADA" : "LIBRE" };
    });

  const postular = (vacanteId) => {
    if (postuladas.includes(vacanteId)) return;
    setPostuladas((prev) => [...prev, vacanteId]);
    const compat = calcCompat(vacantes.find((v) => v.id === vacanteId).requeridos, matriz);
    setCandidatos((prev) => [
      ...prev.filter((c) => !(c.id === 999 && c.busquedaId === vacanteId)),
      {
        id: 999,
        busquedaId: vacanteId,
        nombre: "Lucía Fernández",
        iniciales: "LF",
        carrera: "Ing. en Informática · UBA",
        avance: 62,
        compat,
        turno: compat === 100 ? "Horario compatible" : "Compatibilidad parcial",
        columna: compat >= 90 ? "compatibles" : "postulados",
        entrevista: null,
        proyectos: proyectos.map((p) => ({ titulo: p.titulo, materia: p.materia, rol: p.rol, nota: "—" })),
        habilidades: ["Python", "SQL", "React"],
      },
    ]);
  };

  const agregarProyecto = (p) =>
    setProyectos((prev) => [...prev, { ...p, id: Date.now(), descripcion: p.descripcion || "", tecnologias: p.tecnologias, link: p.link || "" }]);

  const publicarVacante = ({ titulo, tipo, jornada }) => {
    const nueva = {
      id: Date.now(),
      titulo: titulo.trim(),
      empresa: "Mi PyME S.R.L.",
      tipo,
      jornada,
      requeridos: TURNOS.flatMap((t) => (t.id === "Tarde" ? DIAS.map((d) => k(t.id, d)) : [])),
      habilidades: [],
    };
    setVacantes((prev) => [...prev, nueva]);
    setBusquedaId(nueva.id);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased">
      {/* Navegación superior */}
      <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
          <button type="button" onClick={() => setVista("landing")} className="flex items-center gap-2 font-extrabold tracking-tight text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-400 text-slate-950">U</span>
            UniMatch <span className="text-emerald-400">AR</span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {VISTAS.map((v) => {
              const Icono = v.icon;
              const activa = vista === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVista(v.id)}
                  aria-current={activa ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    activa ? "bg-indigo-500/15 text-indigo-300" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icono size={16} /> {v.label}
                </button>
              );
            })}
          </div>

          <button type="button" className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 md:hidden" onClick={() => setMenuAbierto((m) => !m)} aria-label="Abrir menú">
            {menuAbierto ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuAbierto && (
          <div className="border-t border-slate-800 px-4 py-2 md:hidden">
            {VISTAS.map((v) => {
              const Icono = v.icon;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    setVista(v.id);
                    setMenuAbierto(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm ${vista === v.id ? "bg-indigo-500/15 text-indigo-300" : "text-slate-300"}`}
                >
                  <Icono size={16} /> {v.label}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
        {vista === "landing" && (
          <VistaLanding
            onIr={setVista}
            onPostular={postular}
            postuladas={postuladas}
            matriz={matriz}
            vacantes={vacantes}
          />
        )}
        {vista === "estudiante" && (
          <VistaEstudiante
            matriz={matriz}
            onToggle={toggleBloque}
            proyectos={proyectos}
            onAgregarProyecto={agregarProyecto}
            postuladas={postuladas}
            onPostular={postular}
            vacantes={vacantes}
          />
        )}
        {vista === "empresa" && (
          <VistaEmpresa
            vacantes={vacantes}
            busquedaId={busquedaId}
            setBusquedaId={setBusquedaId}
            candidatos={candidatos}
            setCandidatos={setCandidatos}
            onPublicar={publicarVacante}
          />
        )}
        {vista === "legales" && <VistaLegales />}
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        UniMatch Argentina · Datos de demostración · Los cálculos son orientativos
      </footer>
    </div>
  );
}
