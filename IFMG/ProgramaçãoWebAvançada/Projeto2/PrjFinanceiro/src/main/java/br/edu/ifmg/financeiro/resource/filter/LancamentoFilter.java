package br.edu.ifmg.financeiro.resource.filter;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class LancamentoFilter {

	private String descricao;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date dataPagamento;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date dataVencimento;
	private String tipoLancamento;
	
	public LancamentoFilter() {
		// TODO Auto-generated constructor stub
	}
	
	public LancamentoFilter(String descricao, Date dataPagamento, Date dataVencimento, String tipoLancamento) {
		super();
		this.descricao = descricao;
		this.dataPagamento = dataPagamento;
		this.dataVencimento = dataVencimento;
		this.tipoLancamento = tipoLancamento;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Date getDataPagamento() {
		return dataPagamento;
	}

	public void setDataPagamento(Date dataPagamento) {
		this.dataPagamento = dataPagamento;
	}

	public Date getDataVencimento() {
		return dataVencimento;
	}

	public void setDataVencimento(Date dataVencimento) {
		this.dataVencimento = dataVencimento;
	}

	public String getTipoLancamento() {
		return tipoLancamento;
	}

	public void setTipoLancamento(String tipoLancamento) {
		this.tipoLancamento = tipoLancamento;
	}
	
	
}
