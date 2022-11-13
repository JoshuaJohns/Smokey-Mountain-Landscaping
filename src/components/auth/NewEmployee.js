import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const NewEmployee = () => {


    // TODO: This state object should not be blank
    const [images, setImages] = useState([])
    const [employee, setEmployee] = useState({
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFhYYGRgZHB4cHBwcGhwaHBoaHBocHBoaGhocIS4lHR4rIRgYJzgmKy8xNTU1HCQ7QDs0Py40NTEBDAwMEA8QHBISHzQhJCE0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0PT0/NP/AABEIAJgBTAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAQIDBAYAB//EAEgQAAIAAwQFCAcGBAYBBAMAAAECAAMRBBIhMQVBUWFxBhMiMoGRobFCUmJyksHRFILC0uHwI1OisgcVFjNDk4Nzw9PxNESz/8QAGAEBAQEBAQAAAAAAAAAAAAAAAQACAwT/xAAkEQACAgICAwEAAgMAAAAAAAAAAQIREiExUQMTQWGBkRQyQv/aAAwDAQACEQMRAD8A3E0i83E698IBuPhEc5EvNVEOJ1DbCc0nqL3CPR8OJNTj4QlIhEpPV7jTyMLzS7G+N/kYCJqfukdd/dIj5tfb+N/rCiWNr95+cRD6fvGF/eZhlz23/p+awoQ+u/cn5YiH9vjHY7T4QxhQVL0G0hRFKfpeSnWnpwC3j4GIghjtPhHVO3wjO2jlZIT01O8oV/EYgTlpKYVUV1VowHiIrRqmags20dx+sZ7lMx5iZwH9whtn5T8411EBO9iAOJi5bbC86WVmdBWzKkNTEEGp4DURBkkWLJ5OTe43lF5D0BwHlFdLKydd1xBFQKVB1gH6mHmegAF8ZUrUasIw2hxYP0f/APkv2f2tBp9fA+UC5HMo5e+Sx90DIjDGusxZbSMrHp+X1iKmWpHVXgISzEXF91fIRXl6QlAAB8hujktsoAC/kAK3TqFIUWy6CNsOqNsVBb5XrqONREiT0OTqfvD5w2ipk9d8dXfDCRnUd4jg6+sO8QgSVhbxhmG7wjgkRCkbh3CEuL6o7hHUjqfvGIjrg2eY8o64N/xN9Y6OxiGzru89/wBY677R/p+kLWOrEAl07fAfKFodo+E/mjv3lCE7oKIRid3iIBcpmb7NPwB/hvgG9g7RBxmOzzgJyhc/Z52H/G+v2DCQywdVPueawb9Ds+UA7B1Jf3PNYNDq9g8owyQ6YejCTzh2jzjph6PZCTsu0ecQjppy4/IxFI9Lj8hD5hy4/IxHZ/S975CJmiOcrXm6Y6x9Hed8Mut66fAfzQ6c4vNj6R2bTuhoff5R2XBxFCP6yfA35oUI+1Phb6wgYbfKHAjaPCEjrj+x4iHBX2J8RH4Y5abR4QP0rplJQoKM+ymA47TugIu2m0c2t57gHvmp4C7GZ0pysIBuUUDMk1PecBGe0xpkmru/72AfIRnpStaDeeqyh1V9beTs3922MtmkvoQtOmZ08m5eYeu5NPuxWuTWOMwADMhQabsKQTS0JLQi5eciiYi6mqtylGI34ZYRY0DZFeYqMRQAuwPpkU6O8fIGDkHKgW+hp128ecK7ebalDlryisdHOuID119BhHprTRWgNTuqfLKMRbNP2l3Yy2ZUqQtWAF0GgOAJNc8TrgkqCHklLgJcgZ9JrS5qOrPQIXQ3CceiXugoThQ4jdGw5UB/s6slRdquOGWAB31FDwMebJb7TWrzyfZuqR3sCfER6fo60farLU9Zko3/AKiDP7yiv3DHLh2dlJvTPNha7S9VDzHCbC1ADrouQww1RXJr1nY9pPmYKSZhs85qg3SCjgZ0NSjd4I4CIeUNuSY6smQUCtKFjma68Mu+PVBo4Tck6KQujf3RIs8D0RFETIcGjZjYQW2j1BCNOTMIg+6B4iKYEFrBoxpyM6uAVJF26TXCoxrhsyhvsLoqragMk7sfOsXJFoQ531PE/hKxS0ZJ5x1S9cvVoaVxoTSlRspGtsGjURSrXXJNasgw3CtYy4xfKJ+SS+g6zWll6kx67nNewPUeMFJGm5ykC+j7VmLdcj2GFFY/usTfZZX8tPhp5Qk3RstgQBSuqpYV1YHEdhEYl41/zoY+Z/dhmyaUR6BlCMcACKgnYGoOl7JAJ1A0i9zS+qvwiMRNlTJXWHOIcKGhNNgJ649lseMFdF6RFB6aZYk31OsAk1Pusa7Dksc9p1I7JqW0aK4vqjujrg2eJERyyjC8uI2gt2jcd2Yh90b/AIm+saEddG/4m+sJdG1viP1hLo9r4m+sJdG1viP1iAfd3t3/AFjrvtH+n6Qy5vbvhbu9u9fpEI6ntHuX6R1N/gIZd9pv6fpHBfaPcv0gIcwO0fD+sBeUSv8AZ51CtebelQR6B3wYZT6x7hAfTyNzE2jCtx6VXCtw7DCBFYD0JfBPNYNr1Oz5QB0cf4crhL/BB5eoOHyjDGJ0zqxAjlpjoclQOAKVJLEUqfdETv1eyKkuWGnuGAI5pTiaYh219sArkt2haXRnke+uEQ2c9bj8hD5yKLl2lDQ4GoxvZHZCWQdb3vkImTIJwN5s+sdm0wxmCgsxugCpJIAA2mGzpKX3Nz0mr0iBmanPCMlp3SaP0EQFFOupvGvWocKDMVGqsd1wcwpM5USwaJKnuPWCqq/1up8IcvKlNcqYOLS/wsYyEy1V1xWeaYLFI2dq5VoVuorrqJ6Nd9DXjGbtNqRvX71MDS8V3nlsFy9Y5V3DXGXI0kRW6yc49FN+6AaEhdeQWuIO2tYsSrYAKHCmGylNUVHkEG+HN5RXEChGzCLK2ZpwoyqCaYnpYbxr3Y13xzTZprRH9pLNeQBqGmdBXbkdfyixZUdXV2fpA4AAXRUEZGt7A66xPJ0c6LdQy6YnNganXkdkKbM9OqlQSahzXVQYrSgpUe8YdmTUWMTGlGZMtCpLN5OhLRmNMGoAMKbTTdWM3b7RY06KPaGIyJCXe0DGnbGcey2lK0LEHO7MwPEVERCdPpiMNZojMAMyNeUDfYqKXAaSrY1AXdiY3HIK2Ij82XYB6YHIEMWBqcibzLTXfjCS7oVbrEqcFYhiW1kNdUkMK4im8Rr+T+haTVYzpRCOjOv8RcCQwpfQVBA1bxtgY07C/LrRyK19TQPmaE50IxyFDTsrGAmr3x6npxFmyWQXndT0Skt3Dq2OJRSAbxbA0pWMc/JC1sA4lNQ1rUorYa6ORmKdtY145JIpxsypEKDBx+S1r1y0QVpVphPAdGWQCe7CmZEc/JW0CgbV6suYfIpHT2I5+tgdWgxoXSglgoWKgtW8ED0wplWvgYaOSU3W84Y1wknVq6Tmo3eYizZ+SB9Obaf+tR84vYD8VglpoScXRryq94NSgIDVy1Ru3mqoLFgFGZJAA2QIlcjJZzn2rtVPmhMF35JI4UPPnMFyBKAYbhL8TB7UEvA2DP8AUEsmiCY9MyqVHjQxfslvRxVG4g4EcQYuTuTCMlwvOu7FdEHciCKH+hLNUk3zxYH5Yxe5Gf8AHCCTKimY15ERTtOjam/LN1tmphsO0bjiNR1RF/oGyVr0xUUwN3D7oETyeRVmU1Eyf8bHzMT8sWqaNrwyjtM6wW5lamKv6SnWBh95chWgZcPdgo2m5KuiO9x36gbBX9x6XW7/ABwioOScj+baL1ahhMIK4UwotMtoMSTuTEp0Mt5050ONH5pqH1lPN3g28GOakkdMWGcdvlCXjt8oRJaqoXnHNABUkVNBmaClYaSnrt3j6RrJFix947fKOvHbDOh67eH0huHrnvH0htBTJbx2ju/WOqd3d+sRfePePpCqp9Zv6fpCA4lt3d+sDdLKTLfLqNq9k74IH3m/p+kUdIy6o4DtireqfRO6Iilo3/ale7L/AAwdQ9Ds+UAtFf7Mn3JfksHE6nZGWSFfq9kQTJZDc4rENduHAEFb1cjrzxiZz0OyGzOr3ecZNWI4NFqa47AMMdnGOsnpe98hDphwHGGWT0ve/CsTJGb5Vu6SZzVTFrvRDXuk+3hWPPHY7/3xjccuXpLIqMZpy3XtkYZVqQBmSAOJwjqznEsWWy3gXYkKMBtY66bhtiK0MBgtRvqTTZnmYg0tpxVbm5YqqdGuGNNdTtOMVbJbw+GRrXea7eFIy5Lg2kyRHepDE01Cuqm0bwYmM8DAdwhtpXo1GrHs1/I9kVljEm0aWwnLS8p1VFO+FtGkubAVFZy3pKQRXYRkD8opCYaUqaeHdCSbU9SL2XCK6ELybY13pVJ3KadhpQxIbUfUfwHmYCm3uNfeIVNIuTQgd0TkFBVpxPoN3r+aKs+RXEKVPFfrEK246x40h4ti+qe8mJqy4KDo8kH1HIFAQaEYgjYRQ0PZHpf+HWj3eU892NHYKgoF6KVBOG1iR9zfGBeejCjLUcPmMRHpWiNLyRKQIbqqAoAVqCmQEYlaVG48mmTRVS1TXEAVOoD8xaFOiyBQGkC5WnFIU364a6/SLKaeX10+IDzjmbJ5lhfK8aax8soYlketC7gZYECmzCmUTydMqdh4Y+URtpsnBJR2Veo7lGPiIUwok+yTBlMbtAPjCGVN9avaf0iezWl2FWIFcgFHzrCtamHqniv5aRq7CqKhDj1uw/rDkdjXGnvCsX7Ha5bm6eg+oE1De6dZ3Z8YILZFIzr5ROy0BZKE4VqeAWEvLF60aO2DuNPKAtssJUGijjiCfvA1gSJsuFk2nurDCq7fA/SMxaNKvKPTQEe0PJ118aw5eUEhlPRCORhfUFS2qjZHHUaHdG8WFoOTVOo17YoW55iIXRGmMMkUqK7yWwAHad0Z6ycqJ9+66WdkBINyt4CpoaUre1UIGusFW5TVyRqb1IHZUQqLYZGD0jyytwYrcMvcZRB7mBPjAtuUlucisyZ2Xx4CPQrRptWzVh8P4misdNsMmXtIH9tY2ofplyMJabba2ag59hQZozVOvG7EBlWw/wDHPP8A4W/JG/bTTeunxN+SGDSzfzEHYx+kOC7DJ9GC+x23+VP/AOo/ki1LstuVaiVaL9RQ82woNeF2kbP/ADU/zk/62P8A7gh66Xb+cn/W3/yRrBdk5PoydntWlk6q2rhcendSkbPk9pS0zUaXapM1GIIE26UXEUAdTkQTmARtpFb/ADuYPTQ8Eb88IOUcwemn/W3540ofphy/DVWCyOkqWpoSqIpKmoqoUGndF9b12gBrTIDHLZGITlNMHpSv+tx4iYDEk7TpmLdLhDqZGmIRtoQzV4GojDg/gqUTVWAm4aknDXFpz0f3ujMaP0pcS5UOfWaavSqdYElQpxzrxrGiE1XS8pBG7MHYRqMYj45RVSGUot6JHaFsmR975CI3MTWHJve+QiZJmO5bS6ymb1ZtThqJZfMiMBOtNxXYZqDTieiPM90en6VsSTFmpV6vfAqzUDVN3DKlaR5TpVaSit2jBguvaarTjTujctKzMKdgazWUvU1oBmc+6Jms1zpKSaZ6iPkRDLROpRB1Vw4nWTxMTWafXA5jxU4GOSo6hCXaagHbEaGhpsw7NR7qGKqvcLKdWXCF53I5jEb8KfIjuhlwCLtYjQ9MjaIha1Cgzx+uuKz2k1rSh4wDRdfOI0bpDgYQW1WFGFDtiuZ2I3QSFBEGFBik9prSg41hvPN+6wqQUX4M8nrfca4TgcsYzAmGJEnsCCDiIm0xWj1RVAVTWguCpx8hictQjrOysoZSCpyPacceEBbJbjOswKpfdAKpQEscVpj7wPZBK5zUuXLNKgAE+4ASeBYjujityo9DUVBO9snfSplYo9wU6TfvM7uMVj/iAUNLyn38/hUGnfGG5QaWZ3KqaAd//wBnwrEeguT060gutyXLU0abMa4gOZF7Nm3AHfSNtI4ps9Z0Ny+R2CsstqnJG6W83WAMaSXpiVNW8qgjXqI3EajHl1j/AMOhMBCWyU77EFe2hbL90hJUu1WF/wCJWZKGbrfJQYdYMoYrvANNuqCxN/arXIODKR29xG8RLY9P4FKs7KK1FAXUHOhI6Q10466DPWiYHUOKYiuGII1EboEzpjqQyYMuK1yrsO4ioO4x0wyVoxdPZ6AvKFNbldzAjxyiddKo/pK3ukHyjEvPWYiuuTCvA+kp4EEHgYDTrPVmalLuNfAeJEck+zo0brTdlQreC1Ug18qRgNJ6RMohEVcdQUGg25QKm6TnISUmuuOQY07VrTwjR8npSWgPMZrswhaALe6TE9IA717AY6KSS2ZxbZnZulp5JJYLeNT00AvUxPWwJpXjFZrS7emh++p8jG65XSpSWT+Iag2gMtAAQxQkhRs6/jGBspIaXQ0Tp4bZhZsRvDBDXUF2RKbfCJxHzEYCrzEGvFzWhyOAyhGVAKm0SuA5xj4S4L8vJiO8hUoSLOxamPRZ6yhrxpQjjGSeTn0R8NMaA06mWcWcgxQQaZL/AJyngr/NBDRPla5x7JbmKi6OLCouDPMm9hTC7dzNcBroYcujn1lRmcmpQYMagdUeEOcipFprRK/mOf8AxkebQn2qXSt9yNoRdeWb7ohOin9YE5UxBrnQ1Ixu1YjZjHWeyhgVBXoscb2sejW/jXrA5UBgykVIkW2pnV+5fzQ9tIStk48AsSJo9PSdaeya4VrXEk9U1pT0qZjCtOswViATQUxIGBoL1OjjjWhrjRcqw5yDFE626X6k89qDzEWLBaJUw0CTK1ugc4gJOFTghwFRXjEkxtHqDTn3IpQM8lK9FsaoKhQwTYbrDDAxT5PlGdwZqS2Vr6s5N1lwvKCKm8Lq5VJBYCLOXZYx6DlokCXPWQZbksquG5zo3WWoqBLrUGgOyuyJ9KTnsaSpwRumWFOcZbpTXQp0gw1ZdHfEH+fVtiWlgVlKRLBbrCXcCX3UZdJVYjjFf/EHlAs8pLQ3klhumc5jtgbo9RQTQnOsGc7qxcY1weiaMt/PyUm3bt9QxWtbpOYrrANYLaObBve/CsY3k3pFBZZWBNEIwpTAttO6NDoXSCMrHHByM19Vd++Ohx+g+0q99+gvXbOZT0jqphGC5ZaNZH5+guMakK14K4xqcBS8RXjWNtaJtXf321+0d8Z/liT9lfIYpq9sR1kk4mY/7HmLHbE8krUGuNaUOZByOEK0sUp0cQtSxpQ0BND2+EPs9mxvVUhaE3TjnhsNKx56Ow60jEHaISUaqw2UP4T5r3R044bw0RynodxBHeMPGndE3skPAhxSHK6nGpjitciDBYjLsJdh9Dsjr0RDbsOELWFrER0OURwhQIhC2gNI8zNB9E0B7Y0/Ki3gK5U4XVUdovN9IwlItW+1EyFUmprj3CnhAlTsW9UQ6GsXPzaOSEXpuRndr1QdRY0FdVSdUH9IaUDXQCERBdQAYAerLWvRXfmczeMDrKOasin0rQzMTrEtCUAHE3+8QFnzS7Y/vcICs2WjrXNahlWlXdDUI1UcmnoXqXjn0QSa4jHGN1orS326zstALRLp1qioJoASMSK4aqEjbU+LTLWwBRDRK16q3mplVwKmmNBqrGn5L6XdZiOQzuMHValpkthRsBiWAB7Qp1QNDyH9HW4c4bNQK5q0vMLeWpeWRU0BFcsiDrpCSbYk0sqhlYV6LUrQZ5YYGtRAflqjyrUJgIvVvoQKdINSuDHO6G1YPkIfpY3nS0ygQJoDimBWZhzi47yDsN6NwliZlGwto+YUdpR6r1dNzCgmKOIutTc22HaSe7RMr3SO2gWgHCpr90QGFvmOt50a/LN9XC0VgvWQ6gStRsNdUEbZa1c316pUXTtFKk9pjPkrK19NQbqmZu2ZxasemXsxlzEDsjKUmorFCwDllo4BusL2dNuUQ29axdXQzAAK4YekpFPHXTHZGbS5Gm+Adp7T3PMlUdZaVKITXpHN3cmruduAAyGJJr6L060tmuSkdWNbswEhWyLLdYAg61YMpplGibk4rkF16IWnRYXsBrJFDjtOG+IDyZCi8kmYTX10IptqVzrqpCnGuQxl0ZPSNsmPMdmNWc1ZiQxJ40AFMgAAANUV1nOdS03haYaso2icm75LPImipr0bh7gLoHARak8lZd1i0maWr0RVFFPar2axTfDlHssWYqTpGYq3Rdoa7RiaUbokVZaYE5Qk23OxqQox2NTxY4Vx4xrZvJpvQsxI3zEPHIiJJfJlqY2ZK7C4Hk0OUewwkYkWl/WA7Bx2Q0Wh8emcc8cM65ZDsjeryYb+XKXi7nyBiVeSp1tLXgCx8SIM49jhI8+E5z6bHhXedXE98cslmarBzqNFJagFKY9gpHpC8mEAxccQoH4jE6cnZQGJY8Lo/CYPbEvXI82+xuerLmdtR8ovWOw3RXmHd9V50VMtdak8MI9BTQkgaieJ+lInTQso4iXXLK8RhiNZED8sRXjkee2PQBYF2Qi71qBGQcTzgpwh07QyPNCiZKFSAKC9mPSEpmVTxYx6Umi0wHQ4XVYjwNItJo5DQUdqGoq7UBGsC9QHOmED80eh9b7MXN5P3JcqWFmX0Ulw2HWaq9GtBk2HCNHyU0bSUwKGvOH+1IdpqUizbi0UIiLSu69+KCHJ3/bbpemf7VjsrcU2cuGzBW/TU0TZoBNBMcZLqdgMoGaVtsx5LhixBoTUigukEUA4Ra0he56bj/yP/wD0aImWoKkmhBByyOEat0ZpGYdaq2IxVSBrN3OndHWZbqVObHL2Vxqe0eUPWWa3CaMpIrSu4g01HPthtsISgrVroGGQA1Y47O7fAJXDVJhqmGrgI5oyIqmhziYPD7HZ1YMWJHqkY466jWIkeyKBg9eK0+cRESsYdzh14wwoR+kcIiJLw2QopEdY6IrJqb4cAYgEOvRCTXojtbdHtr3KIQTDCWg1TtgI0nKWQFeXIGUuVKTDaEvzO29WAFplXERsmYlq7KUpTtJ7hGj5WTrtsmsNQamBwLSUGRx9KAWlp19ZSjNUOAxNWbX2KINmiOYgZA1LpOY1HGl5Nm9Ys6AtBlzEnA1uOt4AeiWABO4nCHSbQnNKrLW6rmtKi+2AFdZ6Q/YizOszBFV6iaVKsCqm4spmVFqMqc0uI2mtaxL9GSSenYf5cWYJcFD0eiMsEC3UxU0rcRNmvI4QH0dMv2ZpZzVy6nhQTB8LK33DBblawKyyCTeRHONaOVAamyuBptYnXACxEhHu9ZGvjjShHaAR2wfA+m3kaIdUCqEKgamBrhie3OKVm5P2hEZbgKqxudJeochidWXZFmW6uquCKMARTDMV1cYp295yOpks4vi6Qpr0lqymmWILY7hHiXu3TX8o9Tfjq6f9g2VY2M+4wpcNWB1UxGWGdIPy6DH9n97YhkS2UGoLO5q7UqSx8olCMCGYY+ipzJ2kbBHVybqzmlXBeuEghaV1ioDDdQ59mvhD5Qcei1PdMZq36eSWxQIzvrpgAd7HXwGuKdm5Tzphuy5Ckga3JpqyoBEoSonKJtHBUVYXRtYgDvMVDpGSMTOTsevlWPP7Zb5zub6iqmlKGg90DD94xA0+bsUZ6tmeuNrx9mXM9CbTMgf8teAf5CK7co5S5M7dg/ERGBl2h3N0FammAujPDMmmsQ7m3PppkT109E0yWpxOrcTGvWgzZt35VJqRzxKjyrED8qdkvvmH8sZT7BMOT1OOV7HCoAoMa6ttDDX0e4zdch6ZxqtRTcSCAcsDqxhwiGUjTHlU49Be1mMRHlZOHVKINlK+LExmxYkI/wBxW92pJwBFBnj0sNoA1xUqBqB/e7jCoR6M5yNWOWVoBrfQn/008wK+MTHlrNPXRH39NfMkeEZOVPpqQcQ27bWLFptSlLt1QTXqgDPHPPCq4bjtiwj0WT7NjJ5bIFLGS5u53XU03nKg+ohi/wCJFD0LMxOqswAnsCGMPNe6ioPSo7cPQH4u0Qc5I6OvuZlaKm+lWOIGHAHsES8cehc3RvbSecdnY3WY1IpUKT6IOsDLsgzoCUObbEdc7fVWM7dwxPnB7QFObbH0z/aseiqRxuzz/SiETplQR/EfMEem0VTLg1bLU4mzBmL74ED1zEYmo3Xlgb0NPDCM2+i0ZbSOjGc3lIDb6iuztgS+ipvq14ERvmsso9V2XcwH6QxtFMeqVYbjBotmD/y6b6tIVdGvrEbVrAwzUjecPEw02aGkVmT+wuBDTZW1xruZERtZhFiVmSMg74YUO+NY1iU6oibRwOqLEbMuVMJUxopmixsirN0aRqgorA96FDRbexkRGbKYBIQ0KcQV2jxhDKMIVIgELW5mdq5lpYO8jm7o/sEMsdpREvvLZwboBwKggUIIJpXDZCWK1UaWzYhKg+7U1HcaxHaLAVZ5Qxu9ND66HZtw8jGlxaAJ2S3paHSRzR/iMqglwbt5gKhQoFAcSCcgcoL22y2GXMCCYzh2dUZH5xQtxKDBAFBmlxgCaHGmYC8iNFtNtIBJVVV2Zh6ClbrNXUQrORvURaS0i025pwS5KlUuKBRUlphLQAbgvaYy23yapLgs8o3q4QegAuzKg2n1YoaEFXddoB7ifqIfanvMSd7ef1iLRasJjXaXrjEV2gr+sYGg/oZAVdGdUaW1AGoKo2KkY6sR2QRZLovJMUuuKAHEkYXa6rwLLX2oxul2nqQ7S3lkDrAG6V99eie/WYHrpRzm7fEfkY5y8bb0zanrg168p74qTNAOGQpXeVx26odJt0tzS+CSdZNT8VBWMXabRV74p08WHteke3PtOyFW001eMa9a+FmxLfOJNccSThXWa5dsSaFtJluXGdCO0jDuNO6K7yCxvLQ7qgEE5ihz4iDOi9ItLAVpKPTIminH2o6NaOd7BMw9JiSw6RYgEDPHDvhrLQa+1q4nXQ+UE7dzTiollGGRE6XSmy62LdnlkNaUNo+JPkDDREuiXC3ybuOF0oXvLjeAAYEHGopmVAqBUwQe1HMOSdt0riOq54r0Wpn1QaYwKTo5OB2tj2KvHviNgPW/pr50ioglMtqsOqlMesbxArUil0VumlKUFOiBQExGLZTCiCteqnrEXgDe2gMN41AUNDo7W7gPmYQuNh7W+QWIi+bc9T0mHC7SudaU9ap7W9YwOY545muR37QNsKr1yUH4m+cTJLmakI/8YHiREBHZ5d7IjvpwwWp8IsStHLUM5YrrCrcqNl+ZdA40MSS7BaHyDke8WHclfKLknkzNOeG8AfiKnwhoCrabOs6eXDJLVyKIpMy6KBaXgAuquLR6NorQQSWJcuZLcA4XWus1c2YPQFidh2DVGYsPJhVNXehGRxf+kBf7oP2WwSlNWms+4UQdzI3nGo0uTLt8FqbZGUlTUEZg0B7qQd5O2f8Ahtvcn+lYr2UWZnDPMc5A4IRQAADotWlABgI19ilWW6eaCXa786DbjlSBsUjyu3yTzkz33/vMVzIOyLttmtzsyt0i++IN1usdf6REJqekGU+2CR2EZ90dEYKhlGGioxHgYKc2NVDwAhhQbIiK0u2uNdeIr45xYFpVuvLBO0Yfr4wwIK644ruMZxQ5McbPLbqsU3HEfvthP8tc9Vlbhn9PGEu7M+EKCw3fvbFi+xtEL2SYM1YfvaMIrFePfBRLc65NXjj+sSHSCt15atvFAfGp8YraLQEKV2wn2fcYNXLO3rp4j5wq6Mr1HVvA/OC19KgC1nrFd7CDqjQzrA6+gx4Y/wBsUy1MKUPcfGHTEBPosbIgfRtI0godg7oaZIxGJ4QUFmUm2Up0lBwxgvyfkJaHVHLdHpIyUvpTE3QesMMV1jLaLzSK5CvGAVoskyS9+XeWhrhWq/UQPRpG5tmjpSr/AAOeVmAVwi0SYMCecpduA0GFaYas4AWyUkpTJlgKTi90kjPBAxxYjMk5nDICO/1JMmoFDKKABqADIYkgYdsUbQ6qKXsTma+UcnI6JETLXHu4frEdmtIlur0rQ4itKrShx7T4RBaLYDgPD5RTYs2oxJE2bM8prMTUF0+6ajbihMLZdLWMkl+beup5dDXaC6HGMUZDHUYd9mOyKiyN6dJaPPoSPhlfOkVLUdGv6Esb0ZEP9DiMb9nOyF+zHfFQWErbo2zf8VoRR6rsHw3FBFJrFJH/AOwh92W5+kRGzGENnMaVkP5iSP8Akc8JdPNoQpI2zj8C/WEEgwos52RANrK9RzxmflWOLoMpS9rOfnD/ALOdkdzB2QlZGZ2yXLH3K+ZMcLS4yur7qKPlEokmFFmOyKisi59zgXbvI8okkvQ117YmWxnfEqWE7DCkwssSNKOPSbvrF1NLnXjFAWI7POJ0sW00/eyNKzGggmk90TJbQdsDUkU1ecSKhjVstBMTgdcankrN/hP75/sSMQFMazkmf4TYf8h/tSJgB7av8WZX13/vaI13R0dEQjS67uHR8okSYwwrUe1WvfWOjoQZZDLvr+9YwhrUOR8R+9UJHQsPo0qYRixzPlHR0ZEaVFIZSOjojSGssRhKnAFjuqfKOjozIQhZ5dqNLiTDTahp3thBORo62v1pKU9plHhjHR0cpM6KKLK8kGfrlEPsljT5eEWJXIZAa8+3YAD3ivlHR0cPZI3gi1/o6TgWvudt76UMTy+T9lQ/7QJ9q8e+8YWOjL8khxRLN0NZnFHs8lhvRfmIE2jkbYTlZwvuMyjwNPCFjobY0VJvIGzHqtMXtRh5Viq/IBPQnD70s/J/lHR0KmwxRWmchJg6ryW431/CYqvyQtK5S5b8Ji/ipHR0ayYYoo2zQFpRSzSGVRnQqw/pYwIaz/ukdHR0g75MM77GeMOGjz6sdHR1SRgeujjspD10cd0dHQ4oB66O24ePlEq6Orwjo6GjNslTRg9UGF+xqDSgG/8AQR0dEI7mVGHy+sJzQ1D5nsjo6NAcyav0hn2ff51hY6IhRZt3lCmz6/08o6OiAaZIjVclZY5ps+uf7UhI6Bij/9k=",
        startDate: '',
        phoneNumber: "",


    })


    const navigate = useNavigate()
    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/images`)
                .then((response) => response.json())
                .then((imagesArray) => {
                    setImages(imagesArray)
                })
        }, []
    )



    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const customerObj = {
            image: employee.image,
            startDate: employee.startDate,
            phoneNumber: employee.phoneNumber,
            userId: SmokyUserObject.id
        }

        return fetch(`http://localhost:8088/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerObj)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/home")
            })
    }


    return <form className="ticketForm">
        <h2 className="ticketForm__title">New Employee</h2>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Profile Image Url:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={employee.image}
                    onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.image = evt.target.value
                            setEmployee(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-images">

                {images.map((image) => {
                    return <div key={image.id} className="radio">

                        <label className="label-img"> <img className="form-profile-img" src={image.image} alt="image"></img></label>
                        <input
                            name="image"
                            type="radio"
                            value={image.image}
                            checked={employee.image === image.image}
                            onChange={
                                (evt) => {
                                    const copy = { ...employee }
                                    copy.image = (evt.target.value)
                                    setEmployee(copy)
                                }
                            }
                        />
                    </div>
                })}
            </div>
        </fieldset>
        <fieldset>


            <div className="form-group">
                <label htmlFor="description">Start Date:</label>
                <input
                    required autoFocus
                    type="date"
                    className="form-control"
                    value={employee.startDate}
                    onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.startDate = evt.target.value
                            setEmployee(copy)
                        }
                    }></input>
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Phone Number:</label>
                <textarea
                    required autoFocus
                    type="nmber"
                    className="form-control"
                    value={employee.phoneNumber}
                    onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.phoneNumber = evt.target.value
                            setEmployee(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>

        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Create Account
        </button>
    </form>
}
