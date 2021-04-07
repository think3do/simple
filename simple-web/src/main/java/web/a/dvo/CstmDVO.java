package web.a.dvo;

import org.apache.commons.lang3.builder.ToStringBuilder;

import web.z.util.AbstractDVO;

public class CstmDVO extends AbstractDVO {

	private String cstmUserNo   = "";
	private String cstmDscmNo   = "";
	private String cstmNm       = "";
	private String cstmAdr      = "";
	private String sexClCd      = "";
	private String telNo        = "";
	private String hpNo         = "";
	private String emlAdr       = "";
	private String schNm        = "";
	private String jnngDtm      = "";
	private String withDtm      = "";
	private String agrYn        = "";
	private String agrDt        = "";
	private String smsFrwTrgtYn = "";
	private String etcCntn      = "";
	private String mateStatClCd = "";
	
	public String getMateStatClCd() {
		return mateStatClCd;
	}
	public void setMateStatClCd(String mateStatClCd) {
		this.mateStatClCd = mateStatClCd;
	}

	public String getCstmUserNo() {
		return cstmUserNo;
	}
	public void setCstmUserNo(String cstmUserNo) {
		this.cstmUserNo = cstmUserNo;
	}
	public String getCstmDscmNo() {
		return cstmDscmNo;
	}
	public void setCstmDscmNo(String cstmDscmNo) {
		this.cstmDscmNo = cstmDscmNo;
	}
	public String getCstmNm() {
		return cstmNm;
	}
	public void setCstmNm(String cstmNm) {
		this.cstmNm = cstmNm;
	}
	public String getCstmAdr() {
		return cstmAdr;
	}
	public void setCstmAdr(String cstmAdr) {
		this.cstmAdr = cstmAdr;
	}
	public String getSexClCd() {
		return sexClCd;
	}
	public void setSexClCd(String sexClCd) {
		this.sexClCd = sexClCd;
	}
	public String getTelNo() {
		return telNo;
	}
	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}
	public String getHpNo() {
		return hpNo;
	}
	public void setHpNo(String hpNo) {
		this.hpNo = hpNo;
	}
	public String getEmlAdr() {
		return emlAdr;
	}
	public void setEmlAdr(String emlAdr) {
		this.emlAdr = emlAdr;
	}
	public String getSchNm() {
		return schNm;
	}
	public void setSchNm(String schNm) {
		this.schNm = schNm;
	}
	public String getJnngDtm() {
		return jnngDtm;
	}
	public void setJnngDtm(String jnngDtm) {
		this.jnngDtm = jnngDtm;
	}
	public String getWithDtm() {
		return withDtm;
	}
	public void setWithDtm(String withDtm) {
		this.withDtm = withDtm;
	}
	public String getAgrYn() {
		return agrYn;
	}
	public void setAgrYn(String agrYn) {
		this.agrYn = agrYn;
	}
	public String getAgrDt() {
		return agrDt;
	}
	public void setAgrDt(String agrDt) {
		this.agrDt = agrDt;
	}
	public String getSmsFrwTrgtYn() {
		return smsFrwTrgtYn;
	}
	public void setSmsFrwTrgtYn(String smsFrwTrgtYn) {
		this.smsFrwTrgtYn = smsFrwTrgtYn;
	}
	public String getEtcCntn() {
		return etcCntn;
	}
	public void setEtcCntn(String etcCntn) {
		this.etcCntn = etcCntn;
	}

    /**
     * toString 메소드를 대치한다.
     */
    public String toString() {
    	return ToStringBuilder.reflectionToString(this);
    }
}
