package web.d.dvo;

import org.apache.commons.lang3.builder.ToStringBuilder;

import web.z.util.AbstractDVO;

public class CmmDVO extends AbstractDVO {

	private String cmmCd        = "";
	private String cmmNm        = "";
	private String cmmClCd      = "";
	private String cmmClCdNm    = "";
	private String useYn        = "";
	private int ordNo;
	private int payAmt;
	private String mateStatClCd = "";
	private String frsRgtDtm    = "";
	private String frsRgtUerId  = "";
	private String frsRgtPgmId  = "";
	private String lstAltDtm    = "";
	private String lstAltUserId = "";
	private String lstAltPgmId  = "";
	

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





	public String getFrsRgtDtm() {
		return frsRgtDtm;
	}





	public void setFrsRgtDtm(String frsRgtDtm) {
		this.frsRgtDtm = frsRgtDtm;
	}





	public String getFrsRgtUerId() {
		return frsRgtUerId;
	}





	public void setFrsRgtUerId(String frsRgtUerId) {
		this.frsRgtUerId = frsRgtUerId;
	}





	public String getFrsRgtPgmId() {
		return frsRgtPgmId;
	}





	public void setFrsRgtPgmId(String frsRgtPgmId) {
		this.frsRgtPgmId = frsRgtPgmId;
	}





	public String getLstAltDtm() {
		return lstAltDtm;
	}





	public void setLstAltDtm(String lstAltDtm) {
		this.lstAltDtm = lstAltDtm;
	}





	public String getLstAltUserId() {
		return lstAltUserId;
	}





	public void setLstAltUserId(String lstAltUserId) {
		this.lstAltUserId = lstAltUserId;
	}





	public String getLstAltPgmId() {
		return lstAltPgmId;
	}





	public void setLstAltPgmId(String lstAltPgmId) {
		this.lstAltPgmId = lstAltPgmId;
	}





	/**
     * toString 메소드를 대치한다.
     */
    public String toString() {
    	return ToStringBuilder.reflectionToString(this);
    }
}
