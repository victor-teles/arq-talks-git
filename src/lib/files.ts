export type CommitFile = {
  name: string;
  original: string;
  changed: string;
  keywords: string[];
};

export const files: CommitFile[] = [
  {
    name: 'CamposTelaNomeSocial.cs',
    original: `
public class CamposTelaNomeSocial
{
    public string Nome { get; set; }
}`,
    changed: `
public class CamposTelaNomeSocial
{
    public string Nome { get; set; }
    public string NomeCivil { get; set; }
}`,
    keywords: [
      'feat(nome-social)',
      'nome social',
      'nome civil',
      'nomecivil',
      'CamposTelaNomeSocial',
      'class',
      'classe',
      'propriedade',
      'nova',
    ],
  },
  {
    name: 'CamposTelaLogin.cs',
    original: `
public class CamposTelaLogin
{
    public string Email { get; set; }
    public string Senha { get; set; }
}`,
    changed: `
public class CamposTelaLogin
{
    public string Email { get; set; }
    public string Senha { get; set; }
    public bool LembrarSenha { get; set; }
}`,
    keywords: ['lembrar senha', 'CamposTelaLogin', 'class', 'classe', 'propriedade', 'nova', 'login'],
  },
  {
    name: 'CamposTelaSimulacao.cs',
    original: `
public class CamposTelaSimulacao
{
    public Proponente Proponente { get; set; }
    public Oferta Oferta { get; set; }
}`,
    changed: `
public class CamposTelaSimulacao
{
    public Proponente Proponente { get; set; }
    public Oferta Oferta { get; set; }
    public bool EhProlongamento { get; set; }
}`,
    keywords: [
      'wholelife',
      'CamposTelaSimulacao',
      'class',
      'classe',
      'propriedade',
      'nova',
      'Prolongamento',
      'simulação',
    ],
  },
  {
    name: 'Calculadora.cs',
    original: `
public class Calculadora
{
    private readonly ICalculadoraService _calculadoraService;

    public UsuarioController(ICalculadoraService calculadoraService)
    {
        _calculadoraService = calculadoraService;
    }

    public Task<CalculoResultado> Calcular(Parametros parametros)
    {
        return _calculadoraService.CalcularSimulacao(parametros);
    }
}
`,
    changed: `
public class Calculadora
{
    private readonly ICalculadoraService _calculadoraService;

    public UsuarioController(ICalculadoraService calculadoraService)
    {
        _calculadoraService = calculadoraService;
    }

    public Task<CalculoResultado> Calcular(Parametros parametros)
    {
        if (parametros.CalcularProlongamento)
        {
            return _calculadoraService.CalcularSimulacaoComProlongamento(parametros);
        }

        return _calculadoraService.CalcularSimulacao(parametros);
    }
}
`,
    keywords: ['wholelife', 'Calculadora', 'class', 'classe', 'propriedade', 'nova', 'Prolongamento', 'simulação'],
  },
  {
    name: 'LoginService.cs',
    original: `
public class LoginService
{
    public bool Autenticar(string email, string senha)
    {
        throw new NotImplementedException();
    }
}`,
    changed: `
public class LoginService
{
    public bool Autenticar(string email, string senha)
    {
        // lógica autenticar
    }

    public void Desconectar()
    {
        // lógica para logout
    }
}`,
    keywords: ['LoginService', 'class', 'classe', 'propriedade', 'nova', 'logout', 'desconectar'],
  },
  {
    name: 'ProdutoService.cs',
    original: `
public class ProdutoService
{
    public Produto GetProduto(int id)
    {
        // lógica para obter produto
    }
}`,
    changed: `
public class ProdutoService
{
    public Produto GetProduto(int id)
    {
        // lógica para obter produto
    }

    public void DeletarProduto(int id)
    {
        // lógica para deletar produto
    }
}`,
    keywords: ['ProdutoService', 'class', 'classe', 'propriedade', 'nova', 'deletar produto', 'DeleteProduct'],
  },
];
