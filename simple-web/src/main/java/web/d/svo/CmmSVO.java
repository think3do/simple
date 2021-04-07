package web.d.svo;

import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;

import web.z.util.AbstractSVO;

public class CmmSVO extends AbstractSVO {


	private String cmmCd        = "";
	private String cmmNm        = "";
	private String cmmClCd      = "";
	private String cmmClCdNm    = "";
	private String useYn        = "";
	private int ordNo;
	private int payAmt;
	private String mateStatClCd = "";

	private List<CmmSVO> cmmSVOList;
	
	public List<CmmSVO> getCmmSVOList() {
		return cmmSVOList;
	}

	public void setCmmSVOList(List<CmmSVO> cmmSVOList) {
		this.cmmSVOList = cmmSVOList;
	}

	public int getOrdNo() {
		return ordNo;
	}

	public void setOrdNo(int ordNo) {
		this.ordNo = ordNo;
	}

	public int getPayAmt() {
		return payAmt;
	}

	public void setPayAmt(int payAmt) {
		this.payAmt = payAmt;
	}
	
	public String getUseYn() {
		return useYn;
	}

	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

	public String getCmmCd() {
		return cmmCd;
	}

	public void setCmmCd(String cmmCd) {
		this.cmmCd = cmmCd;
	}

	public String getCmmNm() {
		return cmmNm;
	}

	public void setCmmNm(String cmmNm) {
		this.cmmNm = cmmNm;
	}

	public String getCmmClCd() {
		return cmmClCd;
	}

	public void setCmmClCd(String cmmClCd) {
		this.cmmClCd = cmmClCd;
	}

	public String getCmmClCdNm() {
		return cmmClCdNm;
	}

	public void setCmmClCdNm(String cmmClCdNm) {
		this.cmmClCdNm = cmmClCdNm;
	}

	public String getMateStatClCd() {
		return mateStatClCd;
	}

	public void setMateStatClCd(String mateStatClCd) {
		this.mateStatClCd = mateStatClCd;
	}

	/**
     * toString 메소드를 대치한다.
     */
    public String toString() {
    	return ToStringBuilder.reflectionToString(this);
    }
}
