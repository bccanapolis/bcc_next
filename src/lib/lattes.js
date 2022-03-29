export async function fetchProfessor(lattes) {
  return (await fetch(`${process.env.NEXT_PUBLIC_API_IFGPRODUZ}/api/informacoes_docentes?infor_docentes=informacoes_docentesProducao&lattes_id=http://lattes.cnpq.br/${lattes}`)).json();
}