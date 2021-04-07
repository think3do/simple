package web.a.svo;

import org.apache.commons.lang3.builder.ToStringBuilder;

import web.z.util.AbstractSVO;

public class UserSVO extends AbstractSVO  {

	private String userNo       = "";
	private String userId       = "";
	private String pswd         = "";
	private int    pswdErrCnt   = 0;
	private String userClsfCd   = "";
	private String userNm       = "";
	private String userAdr      = "";
	private String hpNo         = "";
	private String emlAdr       = "";
	private String etcCntn      = "";
	private String mateStatClCd = "";
	
    public String getUserNo() {
		return userNo;
	}



	public void setUserNo(String userNo) {
		this.userNo = userNo;
	}



	public String getUserId() {
		return userId;
	}



	public void setUserId(String userId) {
		this.userId = userId;
	}



	public String getPswd() {
		return pswd;
	}



	public void setPswd(String pswd) {
		this.pswd = pswd;
	}



	public int getPswdErrCnt() {
		return pswdErrCnt;
	}



	public void setPswdErrCnt(int pswdErrCnt) {
		this.pswdErrCnt = pswdErrCnt;
	}



	public String getUserClsfCd() {
		return userClsfCd;
	}



	public void setUserClsfCd(String userClsfCd) {
		this.userClsfCd = userClsfCd;
	}



	public String getUserNm() {
		return userNm;
	}



	public void setUserNm(String userNm) {
		this.userNm = userNm;
	}



	public String getUserAdr() {
		return userAdr;
	}



	public void setUserAdr(String userAdr) {
		this.userAdr = userAdr;
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



	public String getEtcCntn() {
		return etcCntn;
	}



	public void setEtcCntn(String etcCntn) {
		this.etcCntn = etcCntn;
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
